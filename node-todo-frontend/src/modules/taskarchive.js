import { useState, useMemo } from 'react'
import { ReactComponent as SortSvg } from '../assets/sort.svg'
import ArchiveTaskButton from './archive-task-button'
import {ReactComponent as ClockSvg} from '../assets/clock-svgrepo-com.svg'
import SortDropdown from './sortdropdown'



const TaskArchive = ({ domain, expanded, showArchived, setShowArchived, archivedTasks, setRefreshTrigger, setError }) => {

    const [archSortMethod, setArchSortMethod] = useState("createdNewest")
    const [archSort, setArchSort] = useState(false)
    const [taskIsArchived, setTaskIsArchived] = useState()

    const sortedArchive = useMemo(() => {
        // console.log("sorting tasks")
        if (archSortMethod === "dueSoonest") {
            return [...archivedTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        } else if (archSortMethod === "dueLatest") {
            return [...archivedTasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        } else if (archSortMethod === "createdNewest") {
            return [...archivedTasks].sort((a, b) => b.id - a.id)
        } else if (archSortMethod === "createdOldest") {
            return [...archivedTasks].sort((a, b) => a.id - b.id)
        } else {
            return archivedTasks
        }
    }, [archivedTasks, archSortMethod])

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
                        <SortDropdown sort={archSort} setSort={setArchSort} archSortMethod={archSortMethod} />
                        ) : (
                        <></>
                        )}
                    {archivedTasks.map((task) => {
                        let taskId = task.id
                        return (
                            <div className="archivedContainer" key={taskId}>
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