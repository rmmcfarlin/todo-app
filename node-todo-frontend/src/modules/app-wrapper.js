import { useState, useTheme, useEffect } from 'react'
import TodoList from './todo-list'
import AddTask from './add-task'


const AppWrapper = () => {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(null)


       useEffect(() => {
        const fetchData = async () => {
            try {
               const response = await fetch("http://localhost:3000/tasks")
               if (!response.ok) {
                throw new Error("Network response not ok")
               }

               const data = await response.json();
               setTasks(data)

            } catch (err) {
                console.log(err)
                setError(err.message)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <AddTask tasks={tasks} setTasks={setTasks} />
            <TodoList tasks={tasks} setTasks={setTasks} setError={setError} />
        </>
    )
}

export default AppWrapper