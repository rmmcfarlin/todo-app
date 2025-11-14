import { useState, useEffect, useMemo } from 'react'
import TodoList from './todo-list'
import Sidebar from './sidebar'
import AddTaskForm from './add-task-form'


const AppWrapper = ({ domain, taskData, setError, refreshTrigger, setRefreshTrigger }) => {

    const { tasks, setTasks } = taskData

    const [addTask, setAddTask] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [sortMethod, setSortMethod] = useState("dueSoonest")
    const [showArchived, setShowArchived] = useState(false)


    return (
        <>
            <div className='appContainer'>
                <Sidebar
                    domain={domain}
                    taskData={taskData}
                    className={`appContainer ${expanded ? 'expanded' : 'collapsed'}`}
                    addTask={addTask}
                    setAddTask={setAddTask}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    setError={setError}
                    showArchived={showArchived}
                    setShowArchived={setShowArchived}
                    setRefreshTrigger={setRefreshTrigger}
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                />
                <div className="appMain">
                    <TodoList
                        domain={domain}
                        taskData={taskData}
                        setError={setError}
                        addTask={addTask}
                        setAddTask={setAddTask}
                        refreshTrigger={refreshTrigger}
                        setRefreshTrigger={setRefreshTrigger}
                        sortMethod={sortMethod}
                        setSortMethod={setSortMethod}
                        showSearch={showSearch}
                        setShowSearch={setShowSearch}
                        showArchived={showArchived}
                        setShowArchived={setShowArchived}
                        expanded={expanded}
                    />
                </div>
            </div>
            <AddTaskForm
                domain={domain}
                tasks={tasks}
                setTasks={setTasks}
                addTask={addTask}
                setAddTask={setAddTask}
                setRefreshTrigger={setRefreshTrigger}
            />

        </>
    )
}

export default AppWrapper