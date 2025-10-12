import { useState, useEffect } from 'react'

function EditableTitle ({ task, handleChange }) {

    const [title, setTitle] = useState(task.title || "")

    useEffect(() => {
        const titleArea = document.querySelector(".editTitle")
        if (titleArea) {
            titleArea.height = "auto"
            titleArea.height = `${titleArea.scrollheight}px`
        }
    }, [title])

    const handleAreaChange = (e) => {
            setTitle(e.target.value)
            e.target.style.height = "auto"
            e.target.style.height = `${e.target.scrollHeight}px`;
        }

    return (
        <textarea 
        name="title"
        type="text" 
        value={title} 
        className="editTitle editTaskInput"
        onChange={(e) => {
            handleChange(e)
            handleAreaChange(e)
        }}
        ></textarea>                                  
    )
}

export default EditableTitle