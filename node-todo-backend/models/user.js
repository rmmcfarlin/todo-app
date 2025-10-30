import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    createdAt: { type: Date, default: Date.now()},
    isActive: { type: Boolean, default: true }
})

const User = mongoose.model("User", userSchema)

export default User