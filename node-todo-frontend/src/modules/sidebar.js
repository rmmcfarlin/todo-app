import { useState } from 'react'
import AddTask from './add-task'

const Sidebar = ({tasks, setTasks}) => {

    return(
        <div className="sidebar">
            <AddTask />
        </div>
    )
}

export default Sidebar