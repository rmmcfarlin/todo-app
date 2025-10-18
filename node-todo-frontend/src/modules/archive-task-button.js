import { useState } from 'react'

const ArchiveTaskButton = ({ domain, setError, task, archiveAction, setRefreshTrigger }) => {

    const [archiveTask, setArchiveTask] = useState(task.archived || false)

    const [ archiveFormData, setArchiveFormData ] = useState({
        "title": task.title,
        "completed": task.completed,
        "dueDate": task.dueDate,
        "notes": task.notes,
        "_id": task._id,
        "archived": task.archived
    })

    const handleArchive = async (id) => {

        const isArchived = !archiveTask 
        setArchiveTask(isArchived)

        setArchiveFormData(prev => ({...prev, archived: isArchived}))
        const updatedTask = {...archiveFormData, archived: isArchived}

        try {
            const response = await fetch(`${domain}/tasks/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedTask)
            })
            if (!response.ok) throw new Error("Failed to archive/unarchive task")
            setRefreshTrigger(prev => prev + 1)
        } catch(err) {
            console.log(err.message)
            setError(err)
        }

    }

    return(
        <button className="button taskButton modifyTaskButton" onClick={() => handleArchive(task._id)}>{archiveAction}</button>
    )
}

export default ArchiveTaskButton