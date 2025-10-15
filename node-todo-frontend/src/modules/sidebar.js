import { useState } from 'react'
import AddTask from './add-task'
import UserProfile from './user-profile'
import TaskArchive from './taskarchive'
import { ReactComponent as HamburgerIcon } from '../assets/menu-hamburger-svgrepo-com.svg'

const Sidebar = ({ tasks, setTasks, addTask, setAddTask, expanded, setExpanded }) => {
    
    const handleExpand = () => {
        setExpanded(!expanded)
        console.log('expanding')
    }


    return(
        <div className='sidebar'>
            <HamburgerIcon onClick={handleExpand} />
            <AddTask expanded={expanded} tasks={tasks} setTasks={setTasks} addTask={addTask} setAddTask={setAddTask} className="sidebarButton addTaskSidebar" />
            <TaskArchive  expanded={expanded} />
            <UserProfile  expanded={expanded} />
        </div>
    )
}

export default Sidebar