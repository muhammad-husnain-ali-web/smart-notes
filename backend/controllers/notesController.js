import Notes from "../models/Notes.js";

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