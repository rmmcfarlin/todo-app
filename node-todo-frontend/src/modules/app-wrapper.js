import { useState, useTheme, useEffect } from 'react'
import TodoList from './todo-list'
import Sidebar from './sidebar'


const AppWrapper = () => {
 
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [error, setError] = useState(null)

     useEffect(() => {
        const fetchData = async () => {
            try {
               const response = await fetch("http://localhost:3000/tasks")
               if (!response.ok) {
                throw new Error("Network response not ok")
               }

               const data = await response.json();

               const userTasks = Object.values(data).flat()
               const uncompletedTasks = userTasks.filter(task => task.completed === false)
               const completedTasks = userTasks.filter(task => task.completed === true)

               setTasks(uncompletedTasks)
               setCompletedTasks(completedTasks)

            } catch (err) {
                console.log(err)
                setError(err.message)
            }
        }
        fetchData();
    }, [])    

    return (
        <>
            <Sidebar tasks={tasks} setTasks={setTasks} />
            <TodoList 
                tasks={tasks} 
                setTasks={setTasks} 
                completedTasks={completedTasks} 
                setCompletedTasks={setCompletedTasks} 
                setError={setError}
            />
        </>
    )
}

export default AppWrapper