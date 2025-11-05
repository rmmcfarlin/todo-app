import { useState } from 'react'
import AddTask from './add-task'
import UserProfile from './user-profile'
import ShowArchivedButton from './show-archived-button'
import { ReactComponent as HamburgerIcon } from '../assets/menu-hamburger-svgrepo-com.svg'
import { ReactComponent as SearchIcon } from '../assets/search.svg'

const Sidebar = ({ domain, taskData, addTask, setAddTask, expanded, setExpanded, showArchived, setShowArchived, setRefreshTrigger }) => {

    const [profileExpanded, setProfileExpanded] = useState(false)
    const { tasks, setTasks, completedTasks, setCompletedTasks, archivedTasks, setArchivedTasks } = taskData
    
    const handleExpand = () => {
        setExpanded(!expanded)
        setProfileExpanded(false)
        console.log('expanding')
    }


    return(
        <div className='sidebar'>
            <HamburgerIcon onClick={handleExpand} />
            <AddTask expanded={expanded} tasks={tasks} setTasks={setTasks} addTask={addTask} setAddTask={setAddTask} className="sidebarButton addTaskSidebar" />
            <ShowArchivedButton expanded={expanded} showArchived={showArchived} setShowArchived={setShowArchived} className="sidebarButton addTaskSidebar" />
            <UserProfile  domain={domain} expanded={expanded} profileExpanded={profileExpanded} setProfileExpanded={setProfileExpanded} setRefreshTrigger={setRefreshTrigger} />
        </div>
    )
}

export default Sidebar
