import { useMemo } from 'react'
import { ReactComponent as EditDots } from '../assets/dots-horizontal.svg'
import { TaskActionMenu } from "./task-action-menu";
import CompletedCheckbox from "./completed-checkbox";
import EditTaskForm from './edit-task-form';

export const TodoTasks = ({ taskData, domain, taskActionFunctions, handlers, setError, setRefreshTrigger, sortMethod }) => {

const { tasks, setTasks, completedTasks, setCompletedTasks, archivedTasks, setArchivedTasks } = taskData
const { handleTaskMenu, showTaskActions, editTask, setEditTask, cancelEdits } = handlers

    const sortedTasks = useMemo(() => {
        if (sortMethod === "dueSoonest") {
            return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        } else if (sortMethod === "dueLatest") {
            return [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        } else if (sortMethod === "createdNewest") {
            return [...tasks].sort((a, b) => b.id - a.id)
        } else if (sortMethod === "createdOldest") {
            return [...tasks].sort((a, b) => a.id - b.id)
        } else {
            return tasks
        }
    }, [tasks, sortMethod])


        console.log(sortedTasks)

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