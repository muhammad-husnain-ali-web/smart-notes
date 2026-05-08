import Notes from "../models/Notes.js";

// Function to create a new note
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;

        const newNote = new Notes({
            title,
            content,
            userId
        });

        await newNote.save();
        res.status(201).json({ success: true, message: 'Note created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}; 

// Function to get all notes for a user
export const getNotes = async (req, res) => {
    try {
        const userId = req.user._id;
        const notes = await Notes.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Function to update a note
export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user._id;
        const note = await Notes.findOne({ _id: id, userId: userId });
        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }
        note.title = title || note.title;
        note.content = content || note.content;
        await note.save();
        res.status(200).json({ success: true, message: 'Note updated successfully' });
    }   
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Function to delete a note
export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const result = await Notes.deleteOne({ _id: id, userId: userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }
        res.status(200).json({ success: true, message: 'Note deleted successfully' });
    }   
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};