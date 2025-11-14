import { useEffect } from 'react'
import { useUser } from '../context/user-context'
import CompletedCheckbox from './completed-checkbox'
import ArchiveTaskButton from './archive-task-button'

const CompletedTasks = ({ domain, taskData, sortMethod, setError, refreshTrigger, setRefreshTrigger, handleDelete, handleArchive }) => {

    
    const { accessToken } = useUser()
    const { viewCount, completedTasks, setCompletedTasks } = taskData

    const completedTaskParams = new URLSearchParams({
        viewCount,
        completed: true,
        archived: false,
        sortMethod
    })
    
    useEffect(() => {

        if (!accessToken) return
        const fetchData = async () => {
            try {
                const response = await fetch(`${domain}/tasks?${completedTaskParams.toString()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                })

                if (!response.ok) {
                    throw new Error("Network response not ok")
                }

                const data = await response.json();

                const userTasks = Object.values(data).flat()

                setCompletedTasks(userTasks)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [accessToken, refreshTrigger, sortMethod, viewCount]) 

    return(
        <>
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
        </>
        )
}

export default CompletedTasks