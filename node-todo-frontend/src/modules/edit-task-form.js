import { useState } from 'react'
import EditableDate from './editable-date'
import EditableNotes from './editable-notes'
import EditableTitle from './editable-title'
import CompletedCheckbox from './completed-checkbox'


const EditTaskForm = ({ domain, task, setError, setEditTask }) => {

    const [ newFormData, setNewFormData ] = useState({
        "title": task.title,
        "completed": task.completed,
        "dueDate": task.dueDate,
        "notes": task.notes,
        "_id": task._id, 
        "archived": task.archive
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewFormData(prev => ({...prev, [name]: value}))
        console.log(newFormData)
    }

        
    const handleSave = async (id) => {
        console.log(`saving ${id}`)
        try {
            const response = await fetch(`${domain}/tasks/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newFormData)
            })
            if (!response.ok) throw new Error("Failed to update task")
            setEditTask("")
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    return(
        <>
            <form onSubmit={handleSave} id="editTaskForm">
                <div className="itemHeader">
                    <EditableTitle task={task} handleChange={handleChange} />
                        <div>
                            <span className="label">Due: </span>
                            <EditableDate task={task} handleChange={handleChange} />
                        </div>
                </div>
                <div className="notesSection">
                    <EditableNotes task={task} handleChange={handleChange} />
                </div>
            </form>
            <button className="button taskButton saveButton" onClick={() => handleSave(task._id)} type="submit" form="editTaskForm">Save</button>
        </>
    )
}

export default EditTaskForm