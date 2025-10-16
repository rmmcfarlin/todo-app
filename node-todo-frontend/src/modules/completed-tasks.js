import { useState } from 'react'
import CompletedCheckbox from './completed-checkbox'

const CompletedTasks = ({ completedTasks, setCompletedTasks, setError, setRefreshTrigger, handleDelete }) => {

    const [showCompleted, setShowCompleted] = useState(false)

    const handleShowCompleted = () => {
        setShowCompleted(!showCompleted)
    }

    const handleArchive = async (id) => {
        if (window.confirm("Are you sure you want to archive this task?")) {
            console.log(id)
             try {
            const response = await fetch(`http://localhost:3000/tasks/${id}/archive`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'}
            })
            if (!response.ok) throw new Error("Failed to archive task")
            setRefreshTrigger(prev => prev + 1)
            } catch (err) {
                console.log(err)
                setError(err.message)
            }
        }
    }

    return(
        <>
            <button className="button showCompletedTasks" onClick={handleShowCompleted}>Show Completed Tasks</button>
            {showCompleted ? (
                  <div className="listContainer">            
        {completedTasks.map((task) => {
                let taskId = task.id
                return (
                        <div className="itemContainer" key={taskId}>
                           <CompletedCheckbox task={task} setError={setError} setCompletedTasks={setCompletedTasks} setRefreshTrigger={setRefreshTrigger} />
                            <div className="itemInfo">                            
                                 <div className="itemHeader">
                                    <span className="todoItem">{task.title}</span>
                                    <div>
                                        <span className="label">Due: </span><span>{task.dueDate}</span>
                                    </div>
                                    </div>
                                <div className="notesSection">
                                    <span>{task.notes}</span>
                                </div>
                                <button className="button deleteButton" onClick={() => handleDelete(taskId)}>Delete</button>
                                <button className="button cancelButton" onClick={() => handleArchive(taskId)}>Archive</button>
                            </div>
                            
                        </div>
                        )
                    }
                )
            }
            </div>
            ) : (
                <></>
            )
        }
        </>
        )
}

export default CompletedTasks