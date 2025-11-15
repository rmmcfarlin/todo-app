import { useState } from "react"
import { ParamDropdown } from "./param-dropdown"

export const Views = ({ view, setView }) => {
    const [showViewDropdown, setShowViewDropdown] = useState(false)
    const viewParams = [
        "List",
        "Card",
        "Calendar"
    ]

    const handleSelect = (param) => {
        setView(param)
    }

    const handleShowDropdown = () => {
        setShowViewDropdown(!showViewDropdown)
    }

    const getClass = () => {
        return showViewDropdown ? "paramDropdownMenu visible" : "paramDropdownMenu hidden"
    }

    return(
        <button className="viewCountMenu" onClick={() => handleShowDropdown()}>
            <span>View: </span><span>{view}</span>
            <ParamDropdown params={viewParams} setValue={handleSelect} className={getClass()}/>
        </button>
    )
}