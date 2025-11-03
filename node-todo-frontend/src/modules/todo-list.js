import { useMemo, useState } from 'react'
import { ReactComponent as SortSvg } from '../assets/sort.svg'
import { ReactComponent as EditDots } from '../assets/dots-horizontal.svg'
import EditTaskForm from './edit-task-form'
import CompletedCheckbox from './completed-checkbox'
import CompletedTasks from "./completed-tasks"
import AddTask from './add-task'
import SortDropdown from './sortdropdown'
import { TaskActionMenu } from './task-action-menu'

const TodoList = ({ domain, tasks, setTasks, completedTasks, setCompletedTasks, setError, addTask, setAddTask, setRefreshTrigger, sortMethod, setSortMethod }) => {

    const [showTaskActions, setShowTaskActions] = useState("")
    const [editTask, setEditTask] = useState("")
    
    const [sort, setSort] = useState(false)

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



    const sortedTasks = useMemo(() => {
        if (sortMethod === "dueSoonest") {
            return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        } else if (sortMethod === "dueLatest") {
            return [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        } else if (sortMethod === "createdNewest") {
            return [...tasks].sort((a, b) => b.id - a.id)
        } else if (sortMethod === "createdOldest") {
            return [...tasks].sort((a, b) => a.id - b.id)
        } else {
            return tasks
        }
    }, [tasks, sortMethod])
    


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

        const isArchived = !archiveTask 
        setArchiveTask(isArchived)

        setArchiveFormData(prev => ({...prev, archived: isArchived}))
        const updatedTask = {...archiveFormData, archived: isArchived}

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

                <AddTask tasks={tasks} setTasks={setTasks} addTask={addTask} setAddTask={setAddTask} className="addTaskMain" />
             {
                sortedTasks.map((task) => {
                
                let taskId = task._id
                let date = new Date(task.dueDate)
                let dueDate = date.toDateString()

                return (
                        <div className="itemContainer" key={taskId}>
                           <EditDots className="taskActionsIcon" onClick={() => handleTaskMenu(taskId)} /> 
                           {showTaskActions == taskId ? (
                            <TaskActionMenu taskActionFunctions={taskActionFunctions} taskId={taskId} />
                           ) : (
                            <></>
                           )}
                           <CompletedCheckbox 
                                task={task} 
                                setError={setError}
                                setCompletedTasks={setCompletedTasks}
                                setRefreshTrigger={setRefreshTrigger}
                                domain={domain}
                                />
                            <div className="itemInfo">                            
                            {editTask === taskId ? (
                                <>
                                    <EditTaskForm domain={domain} task={task} setError={setError} setEditTask={setEditTask} setRefreshTrigger={setRefreshTrigger} />
                                </>
                            ) : (
                               <>
                                 <div className="itemHeader">
                                    <span className="todoItem">{task.title}</span>
                                    <div>
                                        <span className="label">Due: </span><span>{dueDate}</span>
                                    </div>
                                    </div>
                                <div className="notesSection">
                                    <span>{task.notes}</span>
                                </div>
                               </>
                            )   
                        }
                            </div>
                            {editTask === taskId ? (
                               <>
                                <button className="button taskButton cancelButton" onClick={cancelEdits}>Cancel</button>
                               </>)
                                :  (
                                    <></>
                                )
                            }
                        </div>
                )
            })
        }
        <CompletedTasks 
            domain={domain}
            completedTasks={completedTasks} 
            setCompletedTasks={setCompletedTasks} 
            setError={setError}
            setRefreshTrigger={setRefreshTrigger}
            handleDelete={handleDelete}
            handleArchive={handleArchive} 
            />
        </div>
    </>
    )

}

export default TodoList