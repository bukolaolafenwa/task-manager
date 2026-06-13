import express from "express"
import { createTask, deleteTask, getTasks, getSingleTask, updateTask } from "../controllers/taskController"

const router = express.Router()

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getSingleTask)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router;
