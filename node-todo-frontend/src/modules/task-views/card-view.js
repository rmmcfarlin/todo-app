import { ReactComponent as EditDots } from '../../assets/dots-horizontal.svg'
import { TaskActionMenu } from "../task-action-menu";
import { useUser } from '../../context/user-context';
import CompletedCheckbox from "../completed-checkbox";
import EditTaskForm from '../edit-task-form';


export const CardView = ({ domain, setError, setRefreshTrigger, taskData, handlers, taskActionFunctions, selectedTasks }) => {

    const { setCompletedTasks } = taskData
    const { handleTaskMenu, showTaskActions, editTask, setEditTask, cancelEdits } = handlers
    const { handleArchive } = taskActionFunctions

    return (
        <>
            {selectedTasks.map((task) => {

                    let taskId = task._id
                    let date = new Date(task.dueDate)
                    let dueDate = date.toDateString()

                    return (
                        <div className="taskCard" key={taskId}>
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
                                : (
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