import { ReactComponent as SortSvg } from '../assets/sort.svg'
import { ReactComponent as SearchIcon } from '../assets/search.svg'
import { ReactComponent as ClockSvg } from '../assets/clock-svgrepo-com.svg'
import { ReactComponent as CarrotIcon } from '../assets/down-arrow.svg'
import AddTask from './add-task'
import SortDropdown from './sortdropdown'
import { ViewCount } from './view-count'
import { Views } from './views'

export const Toolbar = ({ taskData, toolbarHandlers, showArchived, setShowArchived, view, setView }) => {

    const { tasks, setTasks, viewCount, setViewCount } = taskData
    const { handleSort, sort, setSort, setSortMethod, getSwitchClass, handleShowCompleted, addTask, setAddTask, showSearch, setShowSearch } = toolbarHandlers

    const handleShowSearch = () => {
        setShowSearch(!showSearch)
    }

    const handleShowArchived = () => {
        setShowArchived(!showArchived)
    }

    const getClass = () => {

        if (showSearch) {
            return "toolbarMain hidden"
        } else {
            return "toolbarMain"
        }
    }

    return (
        <div className={getClass()}>
            <div className="toolbarLeft">
                <SortSvg className="toolbarIcon" onClick={handleSort} />
                {sort ? (
                    <SortDropdown sort={sort} setSort={setSort} setSortMethod={setSortMethod} />
                ) : (
                    <></>
                )}
                <ViewCount taskData={taskData} />
                <Views view={view} setView={setView} />
            </div>
            <div className='toolbarMiddle'>
                {showArchived ? (
                    <div className="archiveHeaderContainer">
                        <CarrotIcon onClick={() => handleShowArchived()} className="headerIcon backButton" />
                        <ClockSvg className="headerIcon" />
                        <p className='archivedTasksHeader'>Archived</p>
                    </div>
                ) : (
                    <div className="completedTaskSwitch">
                        <button className={`completedSwitchButton ${getSwitchClass("todo")}`} onClick={() => handleShowCompleted()}>To-Do</button>
                        <button className={`completedSwitchButton ${getSwitchClass("completed")}`} onClick={() => handleShowCompleted()}>Completed</button>
                    </div>
                )}
            </div>
            <div className="toolbarRight">
                <SearchIcon className="toolbarIcon" onClick={handleShowSearch} />
                <AddTask tasks={tasks} setTasks={setTasks} addTask={addTask} setAddTask={setAddTask} className="addTaskMain toolbarIcon" />
            </div>
        </div>
    )
}