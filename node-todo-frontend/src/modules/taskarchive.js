import { useEffect } from 'react'
import { useUser } from '../context/user-context'
import { ListView } from './task-views/list-view'
import { CardView } from './task-views/card-view'
import ArchiveTaskButton from './archive-task-button'



const TaskArchive = ({ domain, taskData, expanded, refreshTrigger, setRefreshTrigger, setError, sortMethod, handleArchive, handlers, taskActionFunctions, view }) => {

    const { accessToken, setAccessToken } = useUser()
    const { viewCount, archivedTasks, setArchivedTasks } = taskData

    const archivedTaskParams = new URLSearchParams({
        viewCount,
        completed: false,
        archived: true,
        sortMethod
    })


    useEffect(() => {

        if (!accessToken) return
        const fetchData = async () => {
            try {
                const request = async (token) => {
                    return fetch(`${domain}/tasks?${archivedTaskParams.toString()}`, {
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
                setArchivedTasks(userTasks)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [accessToken, refreshTrigger, sortMethod, viewCount])


    const getClass = () => {

        if (expanded) {
            return ""
        } else {
            return "collapsed"
        }
    }

    const className = getClass()

    const renderContent = () => {
        if (view === "List") {
            return <ListView
                selectedTasks={archivedTasks}
                taskData={taskData}
                handlers={handlers}
                taskActionFunctions={taskActionFunctions}
                domain={domain}
                setRefreshTrigger={setRefreshTrigger}
                setError={setError}
            />
        } else if (view === "Card") {
            return <CardView
                selectedTasks={archivedTasks}
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

export default TaskArchive