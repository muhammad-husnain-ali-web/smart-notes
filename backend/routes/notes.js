import express from "express";
import { createNote } from "../controllers/notesController.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

// Route for creating a new note
router.post("/", verifyUser, createNote);

export default router;