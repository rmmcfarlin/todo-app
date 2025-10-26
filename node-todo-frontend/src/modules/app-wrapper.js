import { useState, useEffect, useMemo } from 'react'
import TodoList from './todo-list'
import Sidebar from './sidebar'
import AddTaskForm from './add-task-form'
import TaskArchive from './taskarchive'


const AppWrapper = ({ domain, tasks, setTasks, completedTasks, setCompletedTasks, archivedTasks, setArchivedTasks, errror, setError, refreshTrigger, setRefreshTrigger }) => {
  
    const [addTask, setAddTask] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [sortMethod, setSortMethod] = useState("dueSoonest")
    const [showArchived, setShowArchived] = useState(false)
    

   

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
                setRefreshTrigger={setRefreshTrigger}
            />
         
        </>
    )
}

export default AppWrapper