import { React } from 'react'
import { useState, useEffect } from 'react'



const TodoList = () => {

    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
               const response = await fetch("http://localhost:3000/tasks")
               if (!response.ok) {
                throw new Error("Network response not ok")
               }

               const data = await response.json();
               setTasks(data)

            } catch (err) {
                console.error(err)
                setError(err.message)

            }
        }
        fetchData();
    }, [])

    const userTasks = Object.values(tasks).flat()

    console.log(userTasks)

    return (
        <div className="listContainer">
        {
            userTasks.map((task) => {
                return (
                        <div className="itemContainer">
                            <form>
                                <input type="checkbox" value={task.completed}></input>
                            </form>
                            <div className="itemInfo">
                                <div className="itemHeader">
                                    <span className="todoItem">{task.title}</span>
                                    <div>
                                       <span className="label">Due: </span><span>{task.dueDate}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="label">Notes: </span><span>{task.notes}</span>
                                </div>
                            </div>
                        </div>
                )
            })
        }
        </div>
    )
}

export default TodoList