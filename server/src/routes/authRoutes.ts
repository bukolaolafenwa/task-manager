import express from "express"
import { registerUser, loginUser, getProfile } from "../controllers/authController"
import { protect } from "../middleware/authMiddleware";
import User from "../models/User";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);


export default router

