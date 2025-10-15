import { useState, useEffect } from 'react'
import EditTaskForm from './edit-task-form'
import CompletedCheckbox from './completed-checkbox'
import CompletedTasks from "./completed-tasks"
import AddTask from './add-task'

const TodoList = ({tasks, setTasks, completedTasks, setCompletedTasks, setError, addTask, setAddTask}) => {

    const [editTask, setEditTask] = useState("")

    const handleEdit = (id) => {
        setEditTask(id)
    }
    const cancelEdits = () => {
        setEditTask("")
    }

    const handleDelete = async (id) => {

        console.log(`deleting ${id}`)
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        })

        if (!response.ok) throw new Error("Failed to delete task");

        setTasks(prevTasks => prevTasks.filter(tasks => tasks.id !== id))
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    return (
    <>
        <div className="appMain">
             <div className="listContainer">
                    <AddTask tasks={tasks} setTasks={setTasks} addTask={addTask} setAddTask={setAddTask} className="addTaskMain" />
             {
            tasks.map((task) => {
                
                let taskId = task.id

                return (
                        <div className="itemContainer" key={taskId}>
                           <CompletedCheckbox 
                                task={task} 
                                setError={setError} />
                            <div className="itemInfo">                            
                            {editTask === taskId ? (
                                <>
                                    <EditTaskForm task={task} setError={setError} setEditTask={setEditTask} />
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
            completedTasks={completedTasks} 
            setCompletedTasks={setCompletedTasks} 
            setError={setError} />
        </div>
        </div>
       
    </>
    )

}

export default TodoList