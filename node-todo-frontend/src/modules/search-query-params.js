import { useState } from "react"
import { ParamDropdown } from "./param-dropdown"
import { ReactComponent as SortSvg } from '../assets/sort.svg'
import { ReactComponent as TitleSvg } from '../assets/title.svg'
import { ReactComponent as DocumentSvg } from '../assets/document.svg'
import { ReactComponent as CalendarSvg } from '../assets/calendar.svg'

export const SearchParams = ({ paramData }) => {


    const { sortParamValue, setSortParamValue, fieldParamValue, setFieldParamValue, typeParamValue, setTypeParamValue, dateParamValue, setDateParamValue } = paramData
    const [showDropdown, setShowDropdown] = useState('')
  

    const sortParams = [
        "Relevance",
        "Due Date (Soonest)",
        "Due Date (Latest)",
        "Created (Newest)",
        "Created (Oldest)"
    ]

    const fieldParams = [
        "Title + Notes",
        "Title Only",
        "Notes Only"
    ]

    const typeParams = [
        "All Results",
        "Todo Tasks Only",
        "Completed Tasks Only",
        "Todo + Completed",
        "Archived Tasks Only"
    ]
    
    const handleDropdown = (id) => {
        if (id === showDropdown) {
            setShowDropdown('')
        } else {
            setShowDropdown(id)
        }
    }

    const handleSort = (param) => {
        setSortParamValue(param)
    }

    const handleField = (param) => {
        setFieldParamValue(param)
    }

    const handleType = (param) => {
        setTypeParamValue(param)
    }

    const getClass = (id) => {
        if (id === showDropdown) {
            return "paramDropdownMenu visible"
        } else {
            return "paramDropdownMenu hidden"
        }
    }

    return(
        <div className="queryParamContainer">
            <button className="queryParamButton" id="sort" onClick={() => handleDropdown("sort")}>
                <SortSvg className="paramIcon" />
                <span className="paramText"> Sort by {sortParamValue} </span>
                <ParamDropdown params={sortParams} setValue={handleSort} className={getClass("sort")} />
            </button>
            <button className="queryParamButton" id="field" onClick={() => handleDropdown("field")}>
                <TitleSvg className="paramIcon" />
                <span className="paramText">Search {fieldParamValue}</span>
                <ParamDropdown params={fieldParams} setValue={handleField} className={getClass("field")} />
            </button>
            <button className="queryParamButton" id="type" onClick={() => handleDropdown("type")}>
                <DocumentSvg className="paramIcon" />
                <span className="paramText">Include {typeParamValue}</span>
                <ParamDropdown params={typeParams} setValue={handleType} className={getClass("type")}/>
            </button>
            <button className="queryParamButton">
                <CalendarSvg className="paramIcon" />
                <span className="paramText">Date Range</span>
                <input type="date" className={showDropdown == "date" ? 'dateParam visible' : 'dateParam hidden'}></input>
            </button>
            
        </div>
    )
}