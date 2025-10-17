import { useState, useEffect, useMemo } from 'react'
import TodoList from './todo-list'
import Sidebar from './sidebar'
import AddTaskForm from './add-task-form'
import TaskArchive from './taskarchive'


const AppWrapper = () => {
 
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [error, setError] = useState(null)
    const [addTask, setAddTask] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [sortMethod, setSortMethod] = useState("dueSoonest")
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [showArchived, setShowArchived] = useState(false)
    const [archivedTasks, setArchivedTasks] = useState([])
    const domain = "http://localhost:3000"

     useEffect(() => {
            const fetchData = async () => {
            try {
               const response = await fetch(`${domain}/tasks`)
               if (!response.ok) {
                throw new Error("Network response not ok")
               }

               const data = await response.json();

               const userTasks = Object.values(data).flat()
               const uncompletedTasks = userTasks.filter(task => task.completed === false && task.archived === false)
               const completedTasks = userTasks.filter(task => task.completed === true && task.archived === false)
               const archivedTasks = userTasks.filter(task => task.archived === true)

               setTasks(uncompletedTasks)
               setCompletedTasks(completedTasks)
               setArchivedTasks(archivedTasks)
        
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
                domain={domain}
                className={`appContainer ${expanded ? 'expanded' : 'collapsed'}`}
                tasks={tasks} 
                setTasks={setTasks} 
                addTask={addTask} 
                setAddTask={setAddTask} 
                expanded={expanded}
                setExpanded={setExpanded}
                archivedTasks={archivedTasks}
                setArchivedTasks={setArchivedTasks}
                setError={setError}
                showArchived={showArchived} 
                setShowArchived={setShowArchived}
            />
            <div className="appMain">
                {showArchived ? (
            <TaskArchive  
                domain={domain} 
                expanded={expanded} 
                showArchived={showArchived} 
                setShowArchived={setShowArchived} 
                archivedTasks={archivedTasks} 
                setArchivedTasks={setArchivedTasks}
                setError={setError}
                setRefreshTrigger={setRefreshTrigger}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod} />
            ) : (
            <TodoList
                domain={domain} 
                tasks={tasks} 
                setTasks={setTasks} 
                completedTasks={completedTasks} 
                setCompletedTasks={setCompletedTasks} 
                setError={setError}
                addTask={addTask} 
                setAddTask={setAddTask}
                refreshTrigger={refreshTrigger}
                setRefreshTrigger={setRefreshTrigger}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
            /> 
            )}
            </div>
           </div>
            <AddTaskForm
                domain={domain} 
                tasks={tasks}
                setTasks={setTasks}
                addTask={addTask} 
                setAddTask={setAddTask} 
            />
         
        </>
    )
}

export default AppWrapper