import express from "express";
import { registerUser, loginUser, logoutUser, me  } from "../controllers/authController.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for user logout
router.post("/logout", verifyUser, logoutUser);

// Route for getting user info
router.get("/me", me);

export default router;