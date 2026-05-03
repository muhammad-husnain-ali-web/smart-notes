import mongoose from "mongoose"
const { Schema, model, models} = mongoose

const NotesSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Notes || model("Notes", NotesSchema)