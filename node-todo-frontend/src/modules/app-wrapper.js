import { useState, useEffect, useMemo } from 'react'
import TodoList from './todo-list'
import Sidebar from './sidebar'
import AddTaskForm from './add-task-form'
import TaskArchive from './taskarchive'
import { useUser } from '../context/user-context'


const AppWrapper = ({ domain, taskData, errror, setError, refreshTrigger, setRefreshTrigger, userData }) => {
    
    const { loggedIn, setLoggedIn, accessToken, setAccessToken, setCurrentUser } = useUser()
    const { tasks, setTasks, completedTasks, setCompletedTasks, archivedTasks, setArchivedTasks } = taskData

    const [addTask, setAddTask] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [sortMethod, setSortMethod] = useState("dueSoonest")
    const [showArchived, setShowArchived] = useState(false)
   

    return (
        <>
           <div className='appContainer'>
            <Sidebar 
                domain={domain}
                taskData={taskData}
                className={`appContainer ${expanded ? 'expanded' : 'collapsed'}`}
                addTask={addTask} 
                setAddTask={setAddTask} 
                expanded={expanded}
                setExpanded={setExpanded}
                setError={setError}
                showArchived={showArchived} 
                setShowArchived={setShowArchived}
                setRefreshTrigger={setRefreshTrigger}
            />
            <div className="appMain">
                {showArchived ? (
            <TaskArchive  
                domain={domain}
                taskData={taskData} 
                expanded={expanded} 
                showArchived={showArchived} 
                setShowArchived={setShowArchived} 
                setError={setError}
                setRefreshTrigger={setRefreshTrigger}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod} />
            ) : (
            <TodoList
                domain={domain} 
                taskData={taskData}
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
                setRefreshTrigger={setRefreshTrigger}
            />
         
        </>
    )
}

export default AppWrapper