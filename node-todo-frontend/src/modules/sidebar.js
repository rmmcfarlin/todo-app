import { useState } from 'react'
import AddTask from './add-task'

const Sidebar = ({tasks, setTasks}) => {

    return(
        <div className="sidebar">
            <AddTask tasks={tasks} setTasks={setTasks}/>
        </div>
    )
}

export default Sidebar