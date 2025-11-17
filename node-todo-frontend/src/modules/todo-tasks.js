import { useEffect } from 'react'
import { ReactComponent as EditDots } from '../assets/dots-horizontal.svg'
import { TaskActionMenu } from "./task-action-menu";
import { useUser } from '../context/user-context';
import CompletedCheckbox from "./completed-checkbox";
import EditTaskForm from './edit-task-form';
import { CardView } from './task-views/card-view';
import { ListView } from './task-views/list-view';
import { CalendarView } from './task-views/calendar-view';


export const TodoTasks = ({ taskData, domain, taskActionFunctions, handlers, setError, refreshTrigger, setRefreshTrigger, sortMethod, view }) => {

    const { accessToken, setAccessToken } = useUser()
    const { tasks, setTasks, setCompletedTasks, viewCount } = taskData
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
                const request = async (token) => {
                    return fetch(`${domain}/tasks?${taskParams.toString()}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                }

                let response = await request(accessToken)

                if (response.status === 401) {
                    try {
                        const authResponse = await fetch(`${domain}/users/refresh`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include"
                        })

                        if (!authResponse.ok) throw new Error("Unable to refresh")
                        const { accessToken: newAccessToken } = await authResponse.json()
                        setAccessToken(newAccessToken)

                        if (newAccessToken) {
                            response = await request(newAccessToken)
                        }
                    } catch {
                        console.log("Unauthorized, unable to refresh access token")
                    }
                }
                if (!response.ok) {
                    throw new Error("Network response not ok")
                }
                const data = await response.json();

                const userTasks = Object.values(data).flat()
                setTasks(userTasks)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [accessToken, refreshTrigger, sortMethod, viewCount])

    const renderContent = () => {
        if (view === "List") {
            return <ListView
                selectedTasks={tasks}
                taskData={taskData}
                handlers={handlers}
                taskActionFunctions={taskActionFunctions}
                domain={domain}
                setRefreshTrigger={setRefreshTrigger}
                setError={setError}
            />
        } else if (view === "Card") {
            return <CardView
                selectedTasks={tasks}
                taskData={taskData}
                handlers={handlers}
                taskActionFunctions={taskActionFunctions}
                domain={domain}
                setRefreshTrigger={setRefreshTrigger}
                setError={setError} 
            />
        } else if (view === "Calendar") {
            return <CalendarView
                selectedTasks={tasks}
                taskData={taskData}
                handlers={handlers}
                taskActionFunctions={taskActionFunctions}
                domain={domain}
                setRefreshTrigger={setRefreshTrigger}
                setError={setError} 
            />
        } else {
            return <></>
        }
    }

    return (
        <>
            {renderContent()}
        </>
    )
}