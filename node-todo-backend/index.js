let express = require('express')
let fs = require('fs').promises
let cors = require('cors')
let app = express()


app.use(express.json())
app.use(cors());

// GET
app.get('/tasks', async (req,res) => {
    try {
        const data = await fs.readFile('tasks.json', 'utf8')
        res.json(JSON.parse(data))
    } catch (err) {
        res.status(500).json({ error: "unable to read tasks" })
    }
})

//POST
app.post('/tasks', async (req,res) => {
    try {
        const newTask = req.body
        const data = await fs.readFile('tasks.json', 'utf8')
        const tasks = JSON.parse(data)
        tasks.push(newTask)
        await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2))
        res.status(201).json({ message: 'Task Added'})
    } catch (err) {
        res.status(500).json({ error: "Unable to write tasks"})

    }
})

//DELETE

app.delete('/tasks/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id)
        const data = await fs.readFile('tasks.json', 'utf8')
        let tasks = JSON.parse(data)

        tasks = tasks.filter(t => t.id !== id)

        await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2))
        res.json({ message: 'Task Deleted'})

    } catch {
        res.status(500).json({ error: "Unable to delete task"})
    }

})

//PUT
app.put('/tasks/:id', async (req,res) => {
    try {
        const updatedTask = req.body
        const id = parseInt(req.params.id)
        const data = await fs.readFile('tasks.json', 'utf8')
        const tasks = JSON.parse(data)
        const index = tasks.findIndex(task => task.id === id)

        if (index === -1) {
            return res.status(404).json({ error: "Task not found"})
        }

        tasks[index] = { ...tasks[index], ...updatedTask }

        await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2))
        res.status(201).json({ message: "Task updated"})

    } catch {
        res.status(500).json({ error: "Unable to modify task"})
    }
})

app.listen(3000, () => console.log("Express Server running on port 3000.") )