import { ReactComponent as SearchIcon } from '../assets/search.svg'
import { useMemo, useState, useEffect } from 'react'
import { useUser } from '../context/user-context'
import { ReactComponent as EditDots } from '../assets/dots-horizontal.svg'
import {ReactComponent as CarrotIcon} from '../assets/down-arrow.svg'
import { TaskActionMenu } from "./task-action-menu";
import debounce from 'debounce'
import CompletedCheckbox from "./completed-checkbox";
import EditTaskForm from './edit-task-form';
import { SearchParams } from './search-query-params'


export const TaskSearch = ({ taskData, handlers, sortMethod, taskActionFunctions, setError, setRefreshTrigger, domain, setShowSearch }) => {


    const { accessToken } = useUser()
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

        const sortedTasks = useMemo(() => {
            if (sortMethod === "dueSoonest") {
                return [...searchResults].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            } else if (sortMethod === "dueLatest") {
                return [...searchResults].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
            } else if (sortMethod === "createdNewest") {
                return [...searchResults].sort((a, b) => b.id - a.id)
            } else if (sortMethod === "createdOldest") {
                return [...searchResults].sort((a, b) => a.id - b.id)
            } else {
                return searchResults
            }
        }, [searchResults, sortMethod])

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
            dateParamValue
        })

        try {
            const response = await fetch(`${domain}/tasks/search?${searchQuery.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
            if (!response.ok) throw new Error ("Unable to search tasks")

            const data = await response.json()
            const searchResult = Object.values(data).flat()
            
            if (!searchResult) setSearchResults([{title: "No results found"}])
            setSearchResults(searchResult)
               
        } catch (err) {
            console.log(err)
        }
      })();
  }, 300);

  return () => clearTimeout(timeout);
}, [query, fieldParamValue, typeParamValue, dateParamValue]);




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