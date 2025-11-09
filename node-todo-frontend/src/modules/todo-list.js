import { useState, useEffect } from 'react'
import CompletedTasks from "./completed-tasks"
import { TodoTasks } from './todo-tasks'
import { TaskSearch } from './task-search'
import { Toolbar } from './tool-bar'
import TaskArchive from './taskarchive'

const TodoList = ({ domain, taskData, setError, addTask, setAddTask, setRefreshTrigger, sortMethod, setSortMethod, showSearch, setShowSearch, showArchived, setShowArchived, expanded }) => {

    const [showTaskActions, setShowTaskActions] = useState("")
    const [showCompleted, setShowCompleted] = useState(false)
    const [editTask, setEditTask] = useState("")
    const [archiveMap, setArchiveMap] = useState({})  
    const [sort, setSort] = useState(false)

    const { tasks, setTasks, completedTasks, setCompletedTasks, archivedTasks, setArchivedTasks } = taskData

    useEffect(() => {
        const allTasks = [...tasks, ...completedTasks, ...archivedTasks]
        console.log(allTasks)
        const init = {};
        allTasks.forEach(t => (init[t._id] = t.archived || false));
        setArchiveMap(init);
    }, [tasks, archivedTasks, completedTasks])

    const handleTaskMenu = (id) => {
        if (id === showTaskActions) {
            setShowTaskActions("")
            return
        }
        setShowTaskActions(id)
    }

    const handleEdit = (id) => {
        setEditTask(id)
        setShowTaskActions("")
    }
    const cancelEdits = () => {
        setEditTask("")
    }
    const handleSort = () => {
        setSort(!sort)
    }
    
    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this task?")) {
        try {
            const response = await fetch(`${domain}/tasks/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) throw new Error("Failed to delete task");
        setTasks(prevTasks => prevTasks.filter(tasks => tasks._id !== id))
        setRefreshTrigger(prev => prev + 1)
        } catch (err) {
            console.log(err)
        }
      }
    }

    const handleArchive = async (id) => {

        window.confirm("Are you sure you want to archive/unarchive this task?")
        const archivedValue = archiveMap[id];
        const isArchived = !archivedValue
        setArchiveMap(prev => ({ ...prev, [id]: isArchived }));
        const updatedTask = { archived: isArchived }

        try {
            const response = await fetch(`${domain}/tasks/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedTask)
            })
            if (!response.ok) throw new Error("Failed to archive/unarchive task")
            setRefreshTrigger(prev => prev + 1)
        } catch(err) {
            console.log(err.message)
            setError(err)
        }

    }

    const handleShowCompleted = () => {
        setShowCompleted(!showCompleted)
    }

    const getSwitchClass = (id) => {
        if (id === "todo") {
            return showCompleted ? "inactive" : "active"
        }
        
        if (id === "completed") {
            return showCompleted ? "active" : "inactive"
        }
    }

    const handlers = {
        handleTaskMenu,
        cancelEdits,
        showTaskActions, 
        setShowTaskActions,
        editTask,
        setEditTask
    }

    const taskActionFunctions = {
        handleEdit,
        handleDelete,
        handleArchive
    }

    const toolbarHandlers = {
        handleSort,
        sort,
        setSort,
        setSortMethod,
        getSwitchClass,
        handleShowCompleted,
        addTask,
        setAddTask,
        showSearch,
        setShowSearch
    }

    const renderContent = () => {

        if (showArchived) {
            return <TaskArchive  
                domain={domain}
                taskData={taskData} 
                expanded={expanded} 
                showArchived={showArchived} 
                setShowArchived={setShowArchived} 
                setError={setError}
                setRefreshTrigger={setRefreshTrigger}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
                handleArchive={handleArchive} />
        } else if (showCompleted) {
            return <CompletedTasks 
                        domain={domain}
                        completedTasks={completedTasks} 
                        setCompletedTasks={setCompletedTasks} 
                        setError={setError}
                        setRefreshTrigger={setRefreshTrigger}
                        handleDelete={handleDelete}
                        handleArchive={handleArchive} 
                    />
        } else if (showSearch) {
            return <TaskSearch
                        taskData={taskData}
                        handlers={handlers}
                        sortMethod={sortMethod}
                        taskActionFunctions={taskActionFunctions}
                        setError={setError}
                        setRefreshTrigger={setRefreshTrigger}
                        domain={domain}
                        setShowSearch={setShowSearch}
                        handleArchive={handleArchive}
                        archiveMap={archiveMap}
                    />
        } else {
            return <TodoTasks
                    domain={domain} 
                    taskData={taskData}
                    taskActionFunctions={taskActionFunctions}
                    handlers={handlers}
                    setRefreshTrigger={setRefreshTrigger}
                    setError={setError}
                    sortMethod={sortMethod}
                 />
        }
    }

    return (
    <>
        <Toolbar taskData={taskData} toolbarHandlers={toolbarHandlers} showArchived={showArchived} setShowArchived={setShowArchived} />
        <div className="listContainer">
            {renderContent()}
        </div>
    </>
    )

}

export default TodoList