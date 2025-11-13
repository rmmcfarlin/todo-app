import { ParamDropdown } from "./param-dropdown";
import { useState } from 'react'


export const ViewCount = ({ taskData }) => {

    const { viewCount, setViewCount } = taskData
    const [showCountDropdown, setShowCountDropdown] = useState(false)
    const viewCountParams = [
        10,
        25,
        50,
        100
    ]

    const handleShowCountParams = () => {
        setShowCountDropdown(!showCountDropdown)
    }
    const handleSelect = (param) => {
        setViewCount(param)
    }

    const getClass = () => {
        return showCountDropdown ? "paramDropdownMenu visible" : "paramDropdownMenu hidden"
    }
    return(
        <button className="viewCountMenu" onClick={() => handleShowCountParams()}>
            <span>View: {viewCount}</span>
            <ParamDropdown params={viewCountParams} setValue={handleSelect} className={getClass()} />
        </button>
    )
}