import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import { AuthRequest } from "../middleware/authMiddleware";

// Register User
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const {
      fullName,
      email,
      password,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password
    ) {
      res.status(400).json({
        message:
          "All fields are required",
      });

      return;
    }

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      res.status(400).json({
        message:
          "User already exists",
      });

      return;
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        fullName,
        email,
        password:
          hashedPassword,
      });

    const token =
      generateToken(
        user._id.toString()
      );

    res.status(201).json({
  success: true,
  token,
  user: {
    id: user._id,
    name: user.fullName,
    email: user.email,
  },
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Server Error",
    });

  }
};


// Login user
export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      res.status(401).json({
        message:
          "Invalid credentials",
      });

      return;
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      res.status(401).json({
        message:
          "Invalid credentials",
      });

      return;
    }

    const token =
      generateToken(
        user._id.toString()
      );

    res.status(200).json({
  success: true,
  token,
  user: {
    id: user._id,
    name: user.fullName,
    email: user.email,
  },
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Server Error",
    });

  }
};


// Get User Profile
export const getProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authorized",
      });

      return;
    }

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {

    console.error(
      "Get profile error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch profile",
    });

  }
};