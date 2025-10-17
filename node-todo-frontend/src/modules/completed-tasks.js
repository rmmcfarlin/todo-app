import { useState } from 'react'
import CompletedCheckbox from './completed-checkbox'
import ArchiveTaskButton from './archive-task-button'

const CompletedTasks = ({ domain, completedTasks, setCompletedTasks, setError, setRefreshTrigger, handleDelete }) => {

    const [showCompleted, setShowCompleted] = useState(false)

    const handleShowCompleted = () => {
        setShowCompleted(!showCompleted)
    }

    const handleArchive = async (id) => {
        if (window.confirm("Are you sure you want to archive this task?")) {
            console.log(id)
             try {
            const response = await fetch(`${domain}/tasks/${id}/archive`, {
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
                           <CompletedCheckbox domain={domain} task={task} setError={setError} setCompletedTasks={setCompletedTasks} setRefreshTrigger={setRefreshTrigger} />
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
                                <ArchiveTaskButton archiveAction={"Archive"} domain={domain} setError={setError} task={task} setRefreshTrigger={setRefreshTrigger}/>
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