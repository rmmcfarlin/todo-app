import { ReactComponent as SortSvg } from '../assets/sort.svg'
import { ReactComponent as SearchIcon } from '../assets/search.svg'
import AddTask from './add-task'
import SortDropdown from './sortdropdown'

export const Toolbar = ({ taskData, toolbarHandlers }) => {

    const { tasks, setTasks } = taskData
    const { handleSort, sort, setSort, setSortMethod, getSwitchClass, handleShowCompleted, addTask, setAddTask, showSearch, setShowSearch } = toolbarHandlers

    const handleShowSearch = () => {
        setShowSearch(!showSearch)
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
                <SearchIcon  className="toolbarIcon" onClick={handleShowSearch} />
            </div>
            <div className="completedTaskSwitch">
                <button className={`completedSwitchButton ${getSwitchClass("todo")}`} onClick={() => handleShowCompleted()}>To-Do</button>
                <button className={`completedSwitchButton ${getSwitchClass("completed")}`} onClick={() => handleShowCompleted()}>Completed</button>
            </div>
            <AddTask tasks={tasks} setTasks={setTasks} addTask={addTask} setAddTask={setAddTask} className="addTaskMain toolbarIcon" />
        </div>
    )
}