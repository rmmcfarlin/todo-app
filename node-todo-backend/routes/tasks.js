import { Router } from 'express'
import mongoose from 'mongoose'
import Task from '../models/task.js'
import { requireAuth } from '../middleware/auth.js'
import { searchTasks } from '../controllers/task-controller.js'

const router = Router()

// GET
router.get('/', requireAuth, async (req,res) => {
    try {

        const userId = req.user.id

        const data = await Task.find({ userId })
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json({ error: "unable to read tasks" })
    }
})

//POST
router.post('/', requireAuth, async (req,res) => {
    try {
        const userId = req.user.id
        const newTask = req.body
        
        newTask.userId = userId

        const createdTask = await Task.create(newTask)
        return res.status(201).json({ message: 'Task Added', id: createdTask._id })
    } catch (err) {
        return res.status(500).json({ error: "Unable to write tasks"})
    }
})

//DELETE

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Task id not valid "})
    }
    try {
        const deletedTask = await Task.findByIdAndDelete(id)
        return res.status(200).json({ message: 'Task Deleted'})

    } catch {
        return res.status(500).json({ error: "Unable to delete task"})
    }

})

//PUT
router.put('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const updatedTask = req.body
        const result = await Task.findByIdAndUpdate(id, updatedTask)
        if (!result) {
            return res.status(404).json({ error: "Task not found"})
        }
        return res.status(200).json({ message: "Task updated"})

    } catch {
        return res.status(500).json({ error: "Unable to modify task"})
    }
})

// Search 

router.get('/search', requireAuth, searchTasks)

export default router