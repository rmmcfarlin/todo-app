import { useState, useEffect } from 'react'
import EditableNotes from './editable-notes'

const AddTaskForm = ({ tasks, setTasks, addTask, setAddTask }) => {

    const [newNotes, setNewNotes] = useState("")
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        completed: false,
        dueDate: "",
        notes: ""
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
        console.log(formData)
    }

    const handleCancel = () => {
        setAddTask(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })

        const resData = await res.json()
        
        const newTask = {...formData, id: resData.id}

        const updatedList = [...tasks, newTask]

        console.log(updatedList)

        setTasks(updatedList)

        setFormData({
            title: "",
            completed: false,
            dueDate: "",
            notes: ""
        })

        setAddTask(false)
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
                    <button className="cancelButton button" onClick={handleCancel}>Cancel</button>
                    <button className="button saveButton" type="submit">Submit</button>
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