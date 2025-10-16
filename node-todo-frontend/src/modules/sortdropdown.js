

const SortDropdown = ({ setSort, setSortMethod }) => {

    const handleSort = (id) => {
        setSort(false)
        setSortMethod(id)
    }

    return(
        <div className="sortDropdown">
            <button className="button sortButton" onClick={() => handleSort("dueSoonest")}>Due Date — Soonest</button>
            <button className="button sortButton" onClick={() => handleSort("dueLatest")}>Due Date — Latest</button>
            <button className="button sortButton" onClick={() => handleSort("createdNewest")}>Created — Newest</button>
            <button className="button sortButton" onClick={() => handleSort("createdOldest")}>Created — Oldest</button>
        </div>
    )
}

export default SortDropdown