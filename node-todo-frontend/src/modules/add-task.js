import { useState, useEffect } from 'react'

const AddTask = () => {

    const [addTask, setAddTask] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        completed: false,
        dueDate: "",
        notes: ""
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prev => ({...prev, [name]: value}))
    }

    useEffect(() => {
  console.log("Updated formData:", formData);
}, [formData]);

    const handleSubmit = async (e) => {
        // e.preventDefault();
        await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })

        setFormData({
            title: "",
            completed: false,
            dueDate: "",
            notes: ""
        })


    }


    return(
        <div>
            <form className="addTaskForm" onSubmit={handleSubmit}>
                <label for="taskName">Task:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}></input>
                <label for="dueDate">Due Date:</label>
                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange}></input>
                <label for="notes">Notes:</label>
                <input type="text" name="notes" value={formData.notes} onChange={handleChange}></input>
                <button className="submitTaskButton" type="submit">Add Task</button>
            </form>
        </div>
    )
}

export default AddTask