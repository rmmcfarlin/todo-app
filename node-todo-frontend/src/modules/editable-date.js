import { useState } from 'react'

const EditableDate = ({ task, handleChange }) => {
    const [date, setDate] = useState(task.dueDate || "null")

    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    return(
        <>
            <input 
            type="date" 
            name="dueDate" 
            value={date} 
            className='editTaskInput' 
            onChange={(e) => {
                handleChange(e)
                handleDateChange(e)
            }}></input>
                                          
        </>
        
    )
}

export default EditableDate