import { useEffect } from 'react'
import { useUser } from '../context/user-context'
import CompletedCheckbox from './completed-checkbox'
import ArchiveTaskButton from './archive-task-button'
import { ListView } from './task-views/list-view'
import { CardView } from './task-views/card-view'

const CompletedTasks = ({ domain, taskData, sortMethod, setError, refreshTrigger, setRefreshTrigger, handlers, taskActionFunctions, view }) => {


    const { accessToken, setAccessToken } = useUser()
    const { viewCount, completedTasks, setCompletedTasks } = taskData

    const completedTaskParams = new URLSearchParams({
        viewCount,
        completed: true,
        archived: false,
        sortMethod
    })

    useEffect(() => {

        if (!accessToken) return
        const fetchData = async () => {
            try {
                const request = async (token) => {
                    return fetch(`${domain}/tasks?${completedTaskParams.toString()}`, {
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

                setCompletedTasks(userTasks)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [accessToken, refreshTrigger, sortMethod, viewCount])

    const renderContent = () => {
        if (view === "List") {
            return <ListView
                selectedTasks={completedTasks}
                taskData={taskData}
                handlers={handlers}
                taskActionFunctions={taskActionFunctions}
                domain={domain}
                setRefreshTrigger={setRefreshTrigger}
                setError={setError}
            />
        } else if (view === "Card") {
            return <CardView
                selectedTasks={completedTasks}
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

export default CompletedTasks