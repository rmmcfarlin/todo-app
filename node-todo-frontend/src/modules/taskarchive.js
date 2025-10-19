import { useState, useMemo } from 'react'
import { ReactComponent as SortSvg } from '../assets/sort.svg'
import ArchiveTaskButton from './archive-task-button'
import {ReactComponent as ClockSvg} from '../assets/clock-svgrepo-com.svg'
import SortDropdown from './sortdropdown'



const TaskArchive = ({ domain, expanded, showArchived, archivedTasks, setRefreshTrigger, setError, sortMethod, setSortMethod }) => {

    const [archSort, setArchSort] = useState(false)


    // Fix sorting once created info is added in MongoDB
    const sortedArchive = useMemo(() => {
        // console.log("sorting tasks")
        if (sortMethod === "dueSoonest") {
            return [...archivedTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        } else if (sortMethod === "dueLatest") {
            return [...archivedTasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        } else if (sortMethod === "createdNewest") {
            return [...archivedTasks].sort((a, b) => b.id - a.id)
        } else if (sortMethod === "createdOldest") {
            return [...archivedTasks].sort((a, b) => a.id - b.id)
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
            {showArchived ? (
                <div className="archiveListContainer">
                    <SortSvg className="sortIcon" onClick={handleSort} />
                    <div className="archiveHeaderContainer">
                        <ClockSvg className="headerIcon" />
                        <p className='archivedTasksHeader'>Archived Tasks</p>
                    </div>
                    {archSort ? (
                        <SortDropdown sort={archSort} setSort={setArchSort} sortMethod={sortMethod} setSortMethod={setSortMethod} />
                        ) : (
                        <></>
                        )}
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
                                <ArchiveTaskButton domain={domain} serError={setError} task={task} setRefreshTrigger={setRefreshTrigger} archiveAction={"Unarchive"} />
                            </div>
                            </div>
                        )
                    })

                    }
                </div>
            ) : (
               <></> 
            )}
        </>
     
    )
}

export default TaskArchive