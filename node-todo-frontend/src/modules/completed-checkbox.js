import { useState } from 'react'
import { useUser } from '../context/user-context'

const CompletedCheckbox = ({ domain, task, setError, setRefreshTrigger }) => {

    const [completed, setCompleted] = useState(task.completed || false)
    const { accessToken, setAccessToken } = useUser()
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
            const request = async (token) => {
                return fetch(`${domain}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedFormData)
            })}

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
            
            if (!response.ok) throw new Error("Failed to set task as completed")

        } catch (err) {
            console.log(err.message)
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