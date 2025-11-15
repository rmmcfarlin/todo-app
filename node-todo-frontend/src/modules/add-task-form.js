import { useState, useEffect } from 'react'
import { useUser } from '../context/user-context';

const AddTaskForm = ({ domain, tasks, setTasks, addTask, setAddTask, setRefreshTrigger }) => {

    const { accessToken, setAccessToken } = useUser()

    const [newNotes, setNewNotes] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        completed: false,
        dueDate: "",
        notes: "",
        archived: false,
        userId: "",
        created: ""
    })

    useEffect(() => {
        const textarea = document.querySelector(".addNotesInput");
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [newNotes]);

    const handleAreaChange = (e) => {
        setNewNotes(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCancel = () => {
        setAddTask(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const request = async (token) => {
            return await fetch(`${domain}/tasks/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        }

        let response = await request(accessToken);

        if (response.status === 401) {
            try {
                const authRefresh = await fetch(`${domain}/users/refresh`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
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

        const newTask = formData
        const updatedList = [...tasks, newTask]
        
        setFormData({
            title: "",
            completed: false,
            dueDate: "",
            notes: "",
            archived: false,
            userId: ""
        })

        setAddTask(false)
        setRefreshTrigger(prev => prev + 1)
    }


    return (
        <>
            {addTask ? (
                <div className="addTaskContainer">
                    <p>Add New task:</p>
                    <form className="addTaskForm" onSubmit={handleSubmit}>
                        <label for="taskName">Task:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange}></input>
                        <label for="dueDate">Due Date:</label>
                        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange}></input>
                        <label for="notes">Notes:</label>
                        <textarea type="text" name="notes" onChange={handleChange} className="addNotesInput"></textarea>
                        <div className="addTaskButtonContainer">
                            <button className="addTaskSubmit button saveButton" type="submit">Submit</button>
                            <button className="addTaskCancel button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <></>
            )}


        </>
    )
}

export default AddTaskForm