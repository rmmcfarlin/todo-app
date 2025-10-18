import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
    archived: { type: Boolean },
    dueDate: { type: Date },
    notes: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
})

const Task = mongoose.model('Task', taskSchema)

export default Task