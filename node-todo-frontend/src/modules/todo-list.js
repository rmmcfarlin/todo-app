import { useMemo, useState } from 'react'
import { ReactComponent as SortSvg } from '../assets/sort.svg'
import EditTaskForm from './edit-task-form'
import CompletedCheckbox from './completed-checkbox'
import CompletedTasks from "./completed-tasks"
import AddTask from './add-task'
import SortDropdown from './sortdropdown'

const TodoList = ({ domain, tasks, setTasks, completedTasks, setCompletedTasks, setError, addTask, setAddTask, setRefreshTrigger }) => {

    const [editTask, setEditTask] = useState("")
    const [sort, setSort] = useState(false)
    const [sortMethod, setSortMethod] = useState("dueSoonest")


    const handleEdit = (id) => {
        setEditTask(id)
    }
    const cancelEdits = () => {
        setEditTask("")
    }
    const handleSort = () => {
        setSort(!sort)
    }


    const sortedTasks = useMemo(() => {
        // console.log("sorting tasks")
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
        setTasks(prevTasks => prevTasks.filter(tasks => tasks.id !== id))
        setRefreshTrigger(prev => prev + 1)
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
      }
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
                
                let taskId = task.id

                return (
                        <div className="itemContainer" key={taskId}>
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
                                    <EditTaskForm domain={domain} task={task} setError={setError} setEditTask={setEditTask} />
                                </>
                            ) : (
                               <>
                                 <div className="itemHeader">
                                    <span className="todoItem">{task.title}</span>
                                    <div>
                                        <span className="label">Due: </span><span>{task.dueDate}</span>
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
                                <button className="button taskButton deleteButton" onClick={() => handleDelete(taskId)}>Delete</button>
                               </>)
                                :  (<button className="button taskButton modifyTaskButton" onClick={() => handleEdit(taskId)}>Edit</button>)
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
            />
        </div>
    </>
    )

}

export default TodoList