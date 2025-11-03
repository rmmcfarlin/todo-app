import { useState } from 'react'

const CompletedCheckbox = ({ domain, task, setError, setRefreshTrigger }) => {

    const [completed, setCompleted] = useState(task.completed || false)

    const [ newFormData, setNewFormData ] = useState({
        "title": task.title,
        "completed": task.completed,
        "dueDate": task.dueDate,
        "notes": task.notes,
        "_id": task._id,
        "archived": task.archived
    })

    const handleCheck = async (e, id) => {
        const checked = e.target.checked
        setCompleted(checked)
        setNewFormData(prev => ({...prev, completed: e.target.checked}))
        const updatedFormData = {...newFormData, completed: checked}

        try {
            const response = await fetch(`${domain}/tasks/${id}`, {
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
            <label className="custom-checkbox">
                 <input 
                    type="checkbox" 
                    name="completed"
                    checked={completed} 
                    onChange={(e) => {handleCheck(e, task._id)}}
                ></input>
                 <span className="checkmark"></span>
            </label>
           
         </form>
    )

}

export default CompletedCheckbox