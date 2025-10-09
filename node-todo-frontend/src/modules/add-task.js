import { useState, useEffect } from 'react'

const AddTask = ({tasks, setTasks}) => {

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        completed: false,
        dueDate: "",
        notes: ""
    })

    const idGenerator = () => {
        return Math.floor(Math.random() * 1000000000);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // const taskId = idGenerator();

        setFormData(prev => ({...prev, [name]: value}))
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