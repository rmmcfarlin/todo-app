import { useState, useEffect } from 'react'

const AddTaskForm = ({ domain, tasks, setTasks, addTask, setAddTask, setRefreshTrigger }) => {

    const [newNotes, setNewNotes] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        completed: false,
        dueDate: "",
        notes: "",
        archived: false
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
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleCancel = () => {
        setAddTask(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${domain}/tasks/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })

        const newTask = formData
        const updatedList = [...tasks, newTask]

        setTasks(updatedList)

        setFormData({
            title: "",
            completed: false,
            dueDate: "",
            notes: "",
            archived: false
        })

        setAddTask(false)
        setRefreshTrigger(prev => prev + 1)
    }


    return(
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