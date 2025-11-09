import { useState, useMemo } from 'react'
import ArchiveTaskButton from './archive-task-button'



const TaskArchive = ({ domain, taskData, expanded, showArchived, setRefreshTrigger, setError, sortMethod, setSortMethod, handleArchive }) => {

    const [archSort, setArchSort] = useState(false)
    const { tasks, setTasks, completedTasks, setCompletedTasks, archivedTasks, setArchivedTasks } = taskData

    // Fix sorting once created info is added in MongoDB
    const sortedArchive = useMemo(() => {
        // console.log("sorting tasks")
        if (sortMethod === "dueSoonest") {
            return [...archivedTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        } else if (sortMethod === "dueLatest") {
            return [...archivedTasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        } else if (sortMethod === "createdNewest") {
            return [...archivedTasks].sort((a, b) => new Date(b.created) - new Date(a.created))
        } else if (sortMethod === "createdOldest") {
            return [...archivedTasks].sort((a, b) => new Date(a.created) - new Date (b.created))
        } else {
            return archivedTasks
        }
    }, [archivedTasks, sortMethod])

    const handleSort = () => {
        setArchSort(!archSort)
    }

     const getClass = () => {

        if (expanded) {
            return ""
        } else {
            return "collapsed"
        }
    }
    
    const className = getClass()

    return(
        <>                   
            {sortedArchive.map((task) => {
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