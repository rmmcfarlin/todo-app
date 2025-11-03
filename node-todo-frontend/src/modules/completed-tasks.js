import { useState } from 'react'
import CompletedCheckbox from './completed-checkbox'
import ArchiveTaskButton from './archive-task-button'

const CompletedTasks = ({ domain, completedTasks, setCompletedTasks, setError, setRefreshTrigger, handleDelete, handleArchive }) => {

    const [showCompleted, setShowCompleted] = useState(false)

    const handleShowCompleted = () => {
        setShowCompleted(!showCompleted)
    }


    return(
        <>
            <button className="button showCompletedTasks" onClick={handleShowCompleted}>Show Completed Tasks</button>
            {showCompleted ? (
                  <div className="listContainer">            
        {completedTasks.map((task) => {
                let taskId = task._id
                let date = new Date(task.dueDate)
                let dueDate = date.toDateString()
                return (
                        <div className="itemContainer" key={taskId}>
                           <CompletedCheckbox domain={domain} task={task} setError={setError} setCompletedTasks={setCompletedTasks} setRefreshTrigger={setRefreshTrigger} />
                            <div className="itemInfo">                            
                                 <div className="itemHeader">
                                    <span className="todoItem">{task.title}</span>
                                    <div>
                                        <span className="label">Due: </span><span>{dueDate}</span>
                                    </div>
                                    </div>
                                <div className="notesSection">
                                    <span>{task.notes}</span>
                                </div>
                                <button className="button deleteButton" onClick={() => handleDelete(taskId)}>Delete</button>
                                <ArchiveTaskButton handleArchive={handleArchive} archiveAction={"Archive"} domain={domain} setError={setError} task={task} setRefreshTrigger={setRefreshTrigger}/>
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