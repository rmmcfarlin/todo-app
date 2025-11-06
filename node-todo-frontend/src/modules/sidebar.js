import { useState } from 'react'
import AddTask from './add-task'
import UserProfile from './user-profile'
import ShowArchivedButton from './show-archived-button'
import { ReactComponent as HamburgerIcon } from '../assets/menu-hamburger-svgrepo-com.svg'
import { ReactComponent as SearchIcon } from '../assets/search.svg'
import ShowSearchButton from './show-search-button'

const Sidebar = ({ domain, taskData, addTask, setAddTask, expanded, setExpanded, showArchived, setShowArchived, showSearch, setShowSearch, setRefreshTrigger }) => {

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
            <ShowSearchButton showSearch={showSearch} setShowSearch={setShowSearch} expanded={expanded} />
            <AddTask expanded={expanded} tasks={tasks} setTasks={setTasks} addTask={addTask} setAddTask={setAddTask} className="sidebarButton addTaskSidebar" />
            <ShowArchivedButton expanded={expanded} showArchived={showArchived} setShowArchived={setShowArchived} className="sidebarButton addTaskSidebar" />
            <UserProfile  domain={domain} expanded={expanded} profileExpanded={profileExpanded} setProfileExpanded={setProfileExpanded} setRefreshTrigger={setRefreshTrigger} />
        </div>
    )
}

export default Sidebar
