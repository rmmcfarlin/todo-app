import { ReactComponent as EditDots } from '../../assets/dots-horizontal.svg'
import { TaskActionMenu } from "../task-action-menu";
import { useUser } from '../../context/user-context';
import CompletedCheckbox from "../completed-checkbox";
import EditTaskForm from '../edit-task-form';


export const ListView = ({ domain, setError, setRefreshTrigger, taskData, handlers, taskActionFunctions }) => {

    const { tasks, setTasks, setCompletedTasks, viewCount } = taskData
    const { handleTaskMenu, showTaskActions, editTask, setEditTask, cancelEdits } = handlers
    const { handleArchive } = taskActionFunctions

    return (
        <>
            {tasks.map((task) => {

                let taskId = task._id
                let date = new Date(task.dueDate)
                let dueDate = date.toDateString()

                return (
                    <div className="taskListItem" key={taskId}>
                        <div className="taskListMain">
                            <CompletedCheckbox
                                task={task}
                                setError={setError}
                                setCompletedTasks={setCompletedTasks}
                                setRefreshTrigger={setRefreshTrigger}
                                domain={domain}
                            />
                            <span>{task.title}</span>
                            <span>{dueDate}</span>
                        </div>
                    </div>
                )
            })}
        </>
    )

}