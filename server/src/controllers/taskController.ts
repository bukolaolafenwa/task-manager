import { Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../models/Task";

// CREATE TASK
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      dueDate,
      tags,
    } = req.body;

    // Validation - all fields required
    if (
      !title ||
      !description ||
      !dueDate ||
      !tags ||
      tags.length === 0
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });

      return;
    }

    // Due date validation
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      res.status(400).json({
        success: false,
        message:
          "Due date cannot be in the past",
      });

      return;
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      tags,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });

  } catch (error) {
    console.error("Create task error:", error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};



// LIST TASKS

export const getTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const filter: any = {};

    // Category filter
    if (req.query.tags) {
      filter.tags = req.query.tags;
    }

    // Completion filter
    if (req.query.completed) {
      filter.completed =
        req.query.completed === "true";
    }

    const tasks = await Task.find(filter)
      .sort({
        dueDate: 1,
      });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });

  } catch (error) {

    console.error(
      "Get tasks error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

// READ A TASK

export const getSingleTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const id = req.params.id as string;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });

      return;
    }

    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: task,
    });

  } catch (error) {

    console.error(
      "Get task error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch task",
    });
  }
};


// UPDATE TASK

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });

      return;
    }

    const task = await Task.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });

  } catch (error) {
    console.error(
      "Update task error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};


// DELETE TASK

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });

      return;
    }

    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });

      return;
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete task error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};