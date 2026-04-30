import mongoose from "mongoose"
const { Schema, model, models} = mongoose

const UsersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Users || model("Users", UsersSchema)