import { ReactComponent as SearchIcon } from '../assets/search.svg'
import { useMemo, useState, useEffect } from 'react'
import { useUser } from '../context/user-context'
import { ReactComponent as EditDots } from '../assets/dots-horizontal.svg'
import { ReactComponent as CarrotIcon } from '../assets/down-arrow.svg'
import { TaskActionMenu } from "./task-action-menu";
import CompletedCheckbox from "./completed-checkbox";
import EditTaskForm from './edit-task-form';
import { SearchParams } from './search-query-params'
import ArchiveTaskButton from './archive-task-button'



export const TaskSearch = ({ taskData, handlers, sortMethod, taskActionFunctions, setError, setRefreshTrigger, domain, setShowSearch, handleArchive, archiveMap }) => {


    const { accessToken, setAccessToken } = useUser()
    const { tasks, setTasks, completedTasks, setCompletedTasks, archivedTasks, setArchivedTasks } = taskData
    const { handleTaskMenu, showTaskActions, editTask, setEditTask, cancelEdits } = handlers


    const [query, setQuery] = useState('')
    const [sortParamValue, setSortParamValue] = useState("Relevance")
    const [fieldParamValue, setFieldParamValue] = useState("Title + Notes")
    const [typeParamValue, setTypeParamValue] = useState("All Results")
    const [dateParamValue, setDateParamValue] = useState('All time')
    const [dateType, setDateType] = useState("Due:")
    const [searchResults, setSearchResults] = useState([])

    const paramData = {
        sortParamValue,
        setSortParamValue,
        fieldParamValue,
        setFieldParamValue,
        typeParamValue,
        setTypeParamValue,
        dateParamValue,
        setDateParamValue,
        dateType,
        setDateType
    }

    const handleBack = () => {
        setShowSearch(false)
    }

    const handleChange = (e) => {
        const searchTerm = e.target.value
        setQuery(searchTerm)
    }

    const handleSearch = useEffect(() => {
        if (!query) return;

        const timeout = setTimeout(() => {
            (async () => {

                const searchQuery = new URLSearchParams({
                    query,
                    fieldParamValue,
                    typeParamValue,
                    dateType,
                    dateParamValue
                })

                try {
                    const request = async (token) => {
                        return fetch(`${domain}/tasks/search?${searchQuery.toString()}`, {
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

                    if (!response.ok) throw new Error("Unable to search tasks")

                    const data = await response.json()
                    const searchResult = Object.values(data).flat()

                    if (!searchResult) setSearchResults([{ title: "No results found" }])
                    setSearchResults(searchResult)

                } catch (err) {
                    console.log(err)
                }
            })();
        }, 300);

        return () => clearTimeout(timeout);
    }, [query, fieldParamValue, typeParamValue, dateParamValue]);

    const sortedSearch = useMemo(() => {
        if (sortParamValue === "Due Date (Soonest)") {
            return [...searchResults].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        } else if (sortParamValue === "Due Date (Latest)") {
            return [...searchResults].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        } else if (sortParamValue === "Created (Newest)") {
            return [...searchResults].sort((a, b) => new Date(b.created) - new Date(a.created))
        } else if (sortParamValue === "Created (Newest)") {
            return [...searchResults].sort((a, b) => new Date(a.created) - new Date(b.created))
        } else {
            return searchResults
        }
    }, [searchResults, sortParamValue])

    return (
        <>
            <div className="searchHeader">
                <CarrotIcon className="searchBackIcon" onClick={handleBack} />
                <div className="searchContainer">
                    <span className="searchbar">
                        <SearchIcon className="searchbarIcon" />
                        <input type="search" id="search" onChange={(e) => handleChange(e)}></input>
                    </span>
                    <SearchParams paramData={paramData} />
                </div>
            </div>
            {
                sortedSearch.map((task) => {

                    let taskId = task._id
                    let date = new Date(task.dueDate)
                    let dueDate = date.toDateString()
                    let archived = task.archived

                    return (
                        <div className="itemContainer" key={taskId}>
                            <EditDots className="taskActionsIcon" onClick={() => handleTaskMenu(taskId)} />
                            {showTaskActions == taskId ? (
                                <TaskActionMenu taskActionFunctions={taskActionFunctions} taskId={taskId} archiveMap={archiveMap} />
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
                                {archived ? (
                                    <ArchiveTaskButton domain={domain} serError={setError} task={task} setRefreshTrigger={setRefreshTrigger} archiveAction={"Unarchive"} handleArchive={handleArchive} archiveMap={archiveMap} />
                                ) : (
                                    <></>
                                )}
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