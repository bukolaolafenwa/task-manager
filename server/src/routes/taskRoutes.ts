import express from "express"
import { createTask, deleteTask, getTasks, getTaskCount, getSingleTask, updateTask } from "../controllers/taskController"
import { protect } from "../middleware/authMiddleware";


const router = express.Router()

router.post("/", protect, createTask);
router.get("/count", protect, getTaskCount);
router.get("/", protect, getTasks);
router.get("/:id", protect, getSingleTask)
router.put("/:id", protect, updateTask)
router.delete("/:id", protect, deleteTask)

export default router;
