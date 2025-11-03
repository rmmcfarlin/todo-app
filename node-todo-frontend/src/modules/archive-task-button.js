import { useState } from 'react'

const ArchiveTaskButton = ({ domain, setError, task, archiveAction, setRefreshTrigger, handleArchive }) => {

    const [archiveTask, setArchiveTask] = useState(task.archived || false)

    const [ archiveFormData, setArchiveFormData ] = useState({
        "title": task.title,
        "completed": task.completed,
        "dueDate": task.dueDate,
        "notes": task.notes,
        "_id": task._id,
        "archived": task.archived
    })

    return(
        <button className="button taskButton modifyTaskButton" onClick={() => handleArchive(task._id)}>{archiveAction}</button>
    )
}

export default ArchiveTaskButton