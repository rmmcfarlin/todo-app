import { React } from 'react'
import { useState, useEffect } from 'react'
import EditableNotes from './editable-notes'



const TodoList = ({tasks, setTasks, setError}) => {

    const [editTask, setEditTask] = useState("")


    const handleEdit = (id) => {
        setEditTask(id)
    }
    const cancelEdits = () => {
        setEditTask("")
    }

    
    const handleSave = () => {
   
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

    const userTasks = Object.values(tasks).flat()


    return (
        <div className="listContainer">
        {
            userTasks.map((task) => {
                
                let taskId = task.id

                return (
                        <div className="itemContainer" key={taskId}>
                            <form>
                                <input type="checkbox" value={task.completed}></input>
                            </form>
                            <div className="itemInfo">
                                                             
                            {editTask === taskId ? (
                                 <>
                                    <div className="itemHeader">
                                    <form onSubmit={handleSave}></form>
                                        <input type="text" name="editTitle" value={task.title} className="todoItem editTaskInput"></input>
                                        <div>
                                            <span className="label">Due: </span>
                                            <input type="date" name="editDate" value={task.dueDate} className='editTaskInput'></input>
                                        </div>
                                    </div>
                                <div className="notesSection">
                                   <EditableNotes task={task} />
                                </div>
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
                                <button className="taskButton cancelButton" onClick={cancelEdits}>Cancel</button>
                                <button className="taskButton saveButton" onClick={handleSave}>Save</button>
                                <button className="taskButton deleteButton" onClick={() => handleDelete(taskId)}>Delete</button>
                               </>)
                                :  (<button className="taskButton modifyTaskButton" onClick={() => handleEdit(taskId)}>Edit</button>)
                            }
                          
                            
                        </div>
                )
            })
        }
        </div>
    )
}

export default TodoList