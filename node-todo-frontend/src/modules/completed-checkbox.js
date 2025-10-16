import { useState } from 'react'

const CompletedCheckbox = ({ task, setError, setRefreshTrigger }) => {

    const [completed, setCompleted] = useState(task.completed || false)

    const [ newFormData, setNewFormData ] = useState({
        "title": task.title,
        "completed": task.completed,
        "dueDate": task.dueDate,
        "notes": task.notes,
        "id": task.id
    })

    const handleCheck = async (e, id) => {
        const checked = e.target.checked
        setCompleted(checked)
        setNewFormData(prev => ({...prev, completed: e.target.checked}))
        const updatedFormData = {...newFormData, completed: checked}

        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedFormData)
            })
            if (!response.ok) throw new Error("Failed to set task as completed")

        } catch (err) {
            console.log(err.message)
            setError(err)
        }

        setTimeout(() => {
            setRefreshTrigger(prev => prev + 1)
        }, 1250)
    }

    return(
         <form>
            <label class="custom-checkbox">
                 <input 
                    type="checkbox" 
                    name="completed"
                    checked={completed} 
                    onChange={(e) => {handleCheck(e, task.id)}}
                ></input>
                 <span class="checkmark"></span>
            </label>
           
         </form>
    )

}

export default CompletedCheckbox