const http = require('http')
const fs = require('fs')


const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')

    if (req.url === '/tasks' && req.method === 'GET') {
        fs.readFile('tasks.json', 'utf8', (err,data) => {
        if (err) {
            res.statusCode = 500
            return res.end(JSON.stringify({ error: "Unable to read tasks"}))
        }
        res.end(data)
    }) 
} else if (req.url === '/tasks' && req.method === "POST") {
        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {
            const newTask = JSON.parse(body)
            fs.readFile('tasks.json', 'utf8', (err,data) => {
                if (err) {
                    res.statusCode = 500
                    return res.end(JSON.stringify({ error: "Unable to read tasks"}))
                }
                const tasks = JSON.parse(data)
                tasks.push(newTask)
                fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), 'utf8', (err) => {
                    if (err) {
                        res.statusCode = 500
                        return res.end(JSON.stringify({ error: "Unable to write tasks"}))
                    }
                    res.end(JSON.stringify({message: 'Task Added'}))
                })

        })
        })
   
    } else if (req.url.startsWith('/tasks') && req.method === "DELETE") {
        const id = req.url.split('/')[2]

        fs.readFile('tasks.json', 'utf8', (err,data) => {
            if (err) {
                res.statusCode = 500
                return res.end(JSON.stringify({ error: "Unable to read tasks"}))
            } 
            let tasks = JSON.parse(data)
            tasks = tasks.filter(task => task.id !== parseInt(id))
            fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), 'utf8', (err) => {
                if (err) {
                    res.statusCode = 500
                    return res.end(JSON.stringify({ error: "Unable to write tasks"}))
                }
                res.end(JSON.stringify({ message: 'Task Deleted'}))
            })
        })
    } else if (req.url.startsWith('/tasks') && req.method === "PUT") {
        const id = req.url.split('/')[2]

        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {

            const updatedTask = JSON.parse(body)
            
            fs.readFile('tasks.json', 'utf8', (err,data) => {
                if (err) {
                    res.statusCode = 500
                    return res.end(JSON.stringify({ error: "Unable to read tasks"}))
                } 
                let tasks = JSON.parse(data)

                let taskIndex = tasks.findIndex(task => task.id === parseInt(id))
                if (taskIndex === -1) {
                    res.statusCode = 404
                    return res.end(JSON.stringify({ error: "Task not found" }))
                }

                tasks[taskIndex] = {...tasks[taskIndex], ...updatedTask}

                fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), 'utf8', (err) => {
                    if (err) {
                        res.statusCode = 500
                        return res.end(JSON.stringify({ message: "Unable to modify tasks"}))
                    }

                    res.statusCode = 200
                    res.end(JSON.stringify({ message: "Task Updated"}))
                })
            })
        })
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ error: "Route not found"}))
    }

})

server.listen(3000, () => console.log("Server running on http://localhost:3000"))