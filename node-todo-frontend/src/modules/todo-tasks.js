import { useMemo, useEffect } from 'react'
import { ReactComponent as EditDots } from '../assets/dots-horizontal.svg'
import { TaskActionMenu } from "./task-action-menu";
import { useUser } from '../context/user-context';
import CompletedCheckbox from "./completed-checkbox";
import EditTaskForm from './edit-task-form';

export const TodoTasks = ({ taskData, domain, taskActionFunctions, handlers, setError, refreshTrigger, setRefreshTrigger, sortMethod }) => {

    const { accessToken } = useUser()
    const { tasks, setTasks, completedTasks, setCompletedTasks, archivedTasks, setArchivedTasks, viewCount, setViewCount } = taskData
    const { handleTaskMenu, showTaskActions, editTask, setEditTask, cancelEdits } = handlers
    const { handleArchive } = taskActionFunctions


    const taskParams = new URLSearchParams({
        viewCount,
        completed: false,
        archived: false,
        sortMethod
    })

    useEffect(() => {

        if (!accessToken) return
            const fetchData = async () => {
            try {
               const response = await fetch(`${domain}/tasks?${taskParams.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
               })

               if (!response.ok) {
                throw new Error("Network response not ok")
               }

               const data = await response.json();

               const userTasks = Object.values(data).flat()

               setTasks(userTasks)

            } catch (err) {
                console.log(err)
                setError(err.message)
            }
        }
        fetchData();
    }, [accessToken, refreshTrigger]) 

    const sortedTasks = useMemo(() => {
        if (sortMethod === "dueSoonest") {
            return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        } else if (sortMethod === "dueLatest") {
            return [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        } else if (sortMethod === "createdNewest") {
            return [...tasks].sort((a, b) => new Date(b.created) - new Date(a.created))
        } else if (sortMethod === "createdOldest") {
            return [...tasks].sort((a, b) => new Date(a.created) - new Date(b.created))
        } else {
            return tasks
        }
    }, [tasks, sortMethod])

    return(
        <>
            {
            sortedTasks.map((task) => {
                
            let taskId = task._id
            let date = new Date(task.dueDate)
            let dueDate = date.toDateString()

                return (
                        <div className="itemContainer" key={taskId}>
                           <EditDots className="taskActionsIcon" onClick={() => handleTaskMenu(taskId)} /> 
                           {showTaskActions == taskId ? (
                            <TaskActionMenu taskActionFunctions={taskActionFunctions} taskId={taskId} />
                           ) : (
                            <></>
                           )}
                           <CompletedCheckbox 
                                task={task} 
                                setError={setError}
                                setCompletedTasks={setCompletedTasks}
                                setRefreshTrigger={setRefreshTrigger}
                                domain={domain}
                                />
                            <div className="itemInfo">                            
                            {editTask === taskId ? (
                                <>
                                    <EditTaskForm domain={domain} task={task} setError={setError} setEditTask={setEditTask} setRefreshTrigger={setRefreshTrigger} />
                                </>
                            ) : (
                               <>
                                 <div className="itemHeader">
                                    <span className="todoItem">{task.title}</span>
                                    <div>
                                        <span className="label">Due: </span><span>{dueDate}</span>
                                    </div>
                                    </div>
                                <div className="notesSection">
                                    <span>{task.notes}</span>
                                </div>
                               </>
                            )   
                        }
                            </div>
                            {editTask === taskId ? (
                               <>
                                <button className="button taskButton cancelButton" onClick={cancelEdits}>Cancel</button>
                               </>)
                                :  (
                                    <></>
                                )
                            }
                        </div>
                )
            })
        }
        </>
    )
}