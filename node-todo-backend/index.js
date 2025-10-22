import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import tasksRouter from './routes/tasks.js'
import usersRouter from './routes/users.js'


const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors());

app.use('/tasks', tasksRouter)
app.use('/users', usersRouter)


if (process.env.MONGO_URI) {
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
        console.log('MongoDB Connected')
        app.listen(port, () => console.log("Express Server running on port 3000.") )
    } catch {
        console.log("unable to connect to MongoDB Atlas")
        process.exit(1)
    }
} else {
    process.exit(1)
}

mongoose.connection.on('error', err => console.error('Mongo error:', err))

mongoose.connection.on('disconnected', () => console.warn('Mongo disconnected'))

process.on('SIGINT', async () => { 
    console.log("Process shutting down")
    await mongoose.connection.close(); process.exit(0) 
})



