import { useState, useEffect } from 'react'
import { ReactComponent as PlusSignSvg } from "../assets/plus-symbol-button.svg"

const AddTask = ({ addTask, setAddTask, className, expanded }) => {

    const handleAddTask = () => {
        setAddTask(!addTask)
    }

      const getClass = () => {

        if (expanded) {
            return ""
        } else {
            return "collapsed"
        }
    }
    
    const textClass = getClass()

    return(
        <>
        <button className={className} onClick={handleAddTask}>
            <PlusSignSvg className="sidebarIcon" />
            <span className={textClass}>Add Task</span>
        </button>
        </>
    )
}

export default AddTask