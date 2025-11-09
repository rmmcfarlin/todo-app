
export const TaskActionMenu = ({ taskActionFunctions, taskId, archiveMap }) => {

    const { handleDelete, handleEdit, handleArchive } = taskActionFunctions

    return(
        <div className="taskActionMenu">
            <button onClick={() => handleEdit(taskId)} className="taskActionButton">Edit</button>
            <button onClick={() => handleArchive(taskId)} className="taskActionButton">Archive</button>
            <button onClick={() => handleDelete(taskId)} className="taskActionButton">Delete</button>
        </div>
    )
}