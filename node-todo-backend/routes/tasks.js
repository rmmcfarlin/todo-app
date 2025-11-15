import { Router } from 'express'
import mongoose from 'mongoose'
import Task from '../models/task.js'
import { requireAuth } from '../middleware/auth.js'
import { getTasks } from '../controllers/task-controller.js'
import { addTask } from '../controllers/task-controller.js'
import { deleteTask } from '../controllers/task-controller.js'
import { editTask } from '../controllers/task-controller.js'
import { searchTasks } from '../controllers/task-controller.js'

const router = Router()

// GET
router.get('/', requireAuth, getTasks)

//POST
router.post('/', requireAuth, addTask)

//DELETE
router.delete('/:id', requireAuth, deleteTask)

//PUT
router.put('/:id', requireAuth, editTask)

// Search 
router.get('/search', requireAuth, searchTasks)

export default router