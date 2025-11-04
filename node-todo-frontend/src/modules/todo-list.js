import { useMemo, useState, useEffect } from 'react'
import { ReactComponent as SortSvg } from '../assets/sort.svg'
import EditTaskForm from './edit-task-form'
import CompletedCheckbox from './completed-checkbox'
import CompletedTasks from "./completed-tasks"
import AddTask from './add-task'
import SortDropdown from './sortdropdown'
import { TodoTasks } from './todo-tasks'
import { TaskActionMenu } from './task-action-menu'

const TodoList = ({ domain, taskData, setError, addTask, setAddTask, setRefreshTrigger, sortMethod, setSortMethod }) => {

    const [showTaskActions, setShowTaskActions] = useState("")
    const [showCompleted, setShowCompleted] = useState(false)
    const [editTask, setEditTask] = useState("")
    const [archiveMap, setArchiveMap] = useState({})  
    const [sort, setSort] = useState(false)

    const { tasks, setTasks, completedTasks, setCompletedTasks, archivedTasks, setArchivedTasks } = taskData

    useEffect(() => {
        const init = {};
        tasks.forEach(t => (init[t._id] = t.archived || false));
        setArchiveMap(init);
    }, [tasks])

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

        window.confirm("Are you sure you want to archive this task?")

        const isArchived = !archiveMap[id];
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



    return (
    <>
             <div className="listContainer">
                <SortSvg className="sortIcon" onClick={handleSort} />
                {sort ? (
                    <SortDropdown sort={sort} setSort={setSort} setSortMethod={setSortMethod} />
                ) : (
                    <></>
                )}
            <div className="completedTaskSwitch">
                <button className={`completedSwitchButton ${getSwitchClass("todo")}`} onClick={() => handleShowCompleted()}>To-Do</button>
                <button className={`completedSwitchButton ${getSwitchClass("completed")}`} onClick={() => handleShowCompleted()}>Completed</button>
            </div>
            <AddTask tasks={tasks} setTasks={setTasks} addTask={addTask} setAddTask={setAddTask} className="addTaskMain" />
            
            {showCompleted ? (
                <CompletedTasks 
                    domain={domain}
                    completedTasks={completedTasks} 
                    setCompletedTasks={setCompletedTasks} 
                    setError={setError}
                    setRefreshTrigger={setRefreshTrigger}
                    handleDelete={handleDelete}
                    handleArchive={handleArchive} 
                />
            ) : (
                <TodoTasks
                    domain={domain} 
                    taskData={taskData}
                    taskActionFunctions={taskActionFunctions}
                    handlers={handlers}
                    setRefreshTrigger={setRefreshTrigger}
                    setError={setError}
                    sortMethod={sortMethod}
                 />
            )}
        </div>
    </>
    )

}

export default TodoList