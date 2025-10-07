const express = require('express');
const fs = require('fs').promises; // Use promises to avoid callbacks
const app = express();

app.use(express.json()); // parses JSON automatically

// GET /tasks
app.get('/tasks', async (req, res) => {
    try {
        const data = await fs.readFile('tasks.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: "Unable to read tasks" });
    }
});

// POST /tasks
app.post('/tasks', async (req, res) => {
    try {
        const newTask = req.body;
        const data = await fs.readFile('tasks.json', 'utf8');
        const tasks = JSON.parse(data);
        tasks.push(newTask);
        await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2));
        res.status(201).json({ message: 'Task Added' });
    } catch (err) {
        res.status(500).json({ error: "Unable to write tasks" });
    }
});

// PUT /tasks/:id
app.put('/tasks/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedTask = req.body;

        const data = await fs.readFile('tasks.json', 'utf8');
        const tasks = JSON.parse(data);
        const index = tasks.findIndex(t => t.id === id);
        if (index === -1) return res.status(404).json({ error: "Task not found" });

        tasks[index] = { ...tasks[index], ...updatedTask };
        await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2));
        res.json({ message: "Task Updated" });
    } catch (err) {
        res.status(500).json({ error: "Unable to modify tasks" });
    }
});

// DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await fs.readFile('tasks.json', 'utf8');
        let tasks = JSON.parse(data);
        tasks = tasks.filter(t => t.id !== id);
        await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2));
        res.json({ message: "Task Deleted" });
    } catch (err) {
        res.status(500).json({ error: "Unable to delete tasks" });
    }
});

app.listen(3000, () => console.log("Express server running on port 3000"));
