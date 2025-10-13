import { useState } from 'react'
import CompletedCheckbox from './completed-checkbox'

const CompletedTasks = ({ completedTasks, setCompletedTasks, setError }) => {

    return(
        <>
            <button className="button showCompletedTasks">Show Completed Tasks</button>
             <div className="listContainer">
        {
            completedTasks.map((task) => {
                
                let taskId = task.id

                return (
                        <div className="itemContainer" key={taskId}>
                           <CompletedCheckbox task={task} setError={setError} setCompletedTasks={setCompletedTasks} />
                            <div className="itemInfo">                            
                                 <div className="itemHeader">
                                    <span className="todoItem">{task.title}</span>
                                    <div>
                                        <span className="label">Due: </span><span>{task.dueDate}</span>
                                    </div>
                                    </div>
                                <div className="notesSection">
                                    <span>{task.notes}</span>
                                </div>
                            </div>
                        </div>
                        )
                    }
                )
            }
            </div>
        </>
        )
}

export default CompletedTasks