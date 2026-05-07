import express from "express";
import { createNote, getNotes, updateNote } from "../controllers/notesController.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

// Route for creating a new note
router.post("/", verifyUser, createNote);

// Route for getting all notes for a user
router.get("/", verifyUser, getNotes);

// Route for updating a note
router.put("/:id", verifyUser, updateNote);

export default router;