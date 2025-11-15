import { useState } from 'react'
import { useUser } from '../context/user-context'
import EditableDate from './editable-date'
import EditableNotes from './editable-notes'
import EditableTitle from './editable-title'
import CompletedCheckbox from './completed-checkbox'


const EditTaskForm = ({ domain, task, setError, setEditTask, setRefreshTrigger }) => {

    const { accessToken, setAccessToken } = useUser()
    const [newFormData, setNewFormData] = useState({
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
        setNewFormData(prev => ({ ...prev, [name]: value }))
    }


    const handleSave = async (id) => {
        try {
            const request = async (token) => {
                return fetch(`${domain}/tasks/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(newFormData)
                })
            }

            let response = await request(accessToken)

            if (response.status === 401) {
                try {
                    const authRefresh = await fetch(`${domain}/users/refresh`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include"
                    })

                    if (!authRefresh.ok) throw new Error("Unable to refresh accesstoken")

                    const { accessToken: newAccessToken } = await authRefresh.json()
                    setAccessToken(newAccessToken)

                    if (newAccessToken) {
                        response = await request(newAccessToken)
                    }
                } catch {
                    console.log("Unauthorized, invalid access token and unable to refresh token")
                }
            }

            if (!response.ok) throw new Error("Failed to update task")
            setEditTask("")
            setRefreshTrigger(prev => prev + 1)
        } catch (err) {
            console.log(err)
            setError(err.message)
            setRefreshTrigger(prev => prev + 1)
        }
    }

    return (
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