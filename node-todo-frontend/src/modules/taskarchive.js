import { useEffect } from 'react'
import { useUser } from '../context/user-context'
import ArchiveTaskButton from './archive-task-button'



const TaskArchive = ({ domain, taskData, expanded, refreshTrigger, setRefreshTrigger, setError, sortMethod, handleArchive }) => {

    const { accessToken } = useUser()
    const { viewCount, archivedTasks, setArchivedTasks } = taskData

    const archivedTaskParams = new URLSearchParams({
        viewCount,
        completed: false,
        archived: true,
        sortMethod
    })
    

    useEffect(() => {

        if (!accessToken) return
        const fetchData = async () => {
            try {
                const response = await fetch(`${domain}/tasks?${archivedTaskParams.toString()}`, {
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
                setArchivedTasks(userTasks)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [accessToken, refreshTrigger, sortMethod, viewCount])


    const getClass = () => {

        if (expanded) {
            return ""
        } else {
            return "collapsed"
        }
    }

    const className = getClass()

    return (
        <>
            {archivedTasks.map((task) => {
                let taskId = task._id
                let date = new Date(task.dueDate)
                let dueDate = date.toDateString()
                return (
                    <div className="archivedContainer" key={taskId}>
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
                            <ArchiveTaskButton domain={domain} serError={setError} task={task} setRefreshTrigger={setRefreshTrigger} archiveAction={"Unarchive"} handleArchive={handleArchive} />
                        </div>
                    </div>
                )
            })
            }
        </>
    )
}

export default TaskArchive