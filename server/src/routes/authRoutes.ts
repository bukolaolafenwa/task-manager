import express from "express"
import { registerUser, loginUser, getProfile , updateProfile, updateProfileImage} from "../controllers/authController"
import { protect } from "../middleware/authMiddleware";
import User from "../models/User";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/profile-image", protect, updateProfileImage);


export default router
