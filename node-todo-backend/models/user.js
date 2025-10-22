import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 30 },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now()},
    isActive: { type: Boolean, default: true }
})

const User = mongoose.model("User", userSchema)

export default User