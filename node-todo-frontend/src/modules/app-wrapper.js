import { useState, useEffect, useMemo } from 'react'
import TodoList from './todo-list'
import Sidebar from './sidebar'
import AddTaskForm from './add-task-form'


const AppWrapper = () => {
 
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [error, setError] = useState(null)
    const [addTask, setAddTask] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

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
        
               console.log('re-rendering')

            } catch (err) {
                console.log(err)
                setError(err.message)
            }
        }
        fetchData();
    }, [refreshTrigger])    

    return (
        <>
           <div className='appContainer'>
            <Sidebar 
                className={`appContainer ${expanded ? 'expanded' : 'collapsed'}`}
                tasks={tasks} 
                setTasks={setTasks} 
                addTask={addTask} 
                setAddTask={setAddTask} 
                expanded={expanded}
                setExpanded={setExpanded}
            />
            <TodoList 
                tasks={tasks} 
                setTasks={setTasks} 
                completedTasks={completedTasks} 
                setCompletedTasks={setCompletedTasks} 
                setError={setError}
                addTask={addTask} 
                setAddTask={setAddTask}
                refreshTrigger={refreshTrigger}
                setRefreshTrigger={setRefreshTrigger}
            /> 
           </div>
            <AddTaskForm 
                tasks={tasks}
                setTasks={setTasks}
                addTask={addTask} 
                setAddTask={setAddTask} 
            />
        </>
    )
}

export default AppWrapper