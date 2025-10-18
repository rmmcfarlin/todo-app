import { Router } from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import Task from '../models/task.js'

const router = Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// GET
router.get('/', async (req,res) => {
    try {
        const filePath = path.join(__dirname, '..', 'tasks.json')
        const data = await fs.readFile(filePath, 'utf8')
        res.json(JSON.parse(data))
    } catch (err) {
        res.status(500).json({ error: "unable to read tasks" })
    }
})

//POST
router.post('/', async (req,res) => {
    try {
        const taskId = Date.now()

        const newTask = {...req.body, id: taskId}

        const filePath = path.join(__dirname, '..', 'tasks.json')
        const data = await fs.readFile(filePath, 'utf8')
        const tasks = JSON.parse(data)
        tasks.push(newTask)
        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2))
        res.status(201).json({ message: 'Task Added', id: taskId})
    } catch (err) {
        res.status(500).json({ error: "Unable to write tasks"})

    }
})

//DELETE

router.delete('/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id)
        const filePath = path.join(__dirname, '..', 'tasks.json')
        const data = await fs.readFile(filePath, 'utf8')
        let tasks = JSON.parse(data)

        tasks = tasks.filter(t => t.id !== id)

        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2))
        res.json({ message: 'Task Deleted'})

    } catch {
        res.status(500).json({ error: "Unable to delete task"})
    }

})

//PUT
router.put('/:id', async (req,res) => {
    try {
        const updatedTask = req.body
        const id = parseInt(req.params.id)
        const filePath = path.join(__dirname, '..', 'tasks.json')
        const data = await fs.readFile(filePath, 'utf8')
        const tasks = JSON.parse(data)
        const index = tasks.findIndex(task => task.id === id)

        if (index === -1) {
            return res.status(404).json({ error: "Task not found"})
        }

        tasks[index] = { ...tasks[index], ...updatedTask }

        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2))
        res.status(201).json({ message: "Task updated"})

    } catch {
        res.status(500).json({ error: "Unable to modify task"})
    }
})

export default router