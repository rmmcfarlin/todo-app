import { useState } from 'react'
import {ReactComponent as ClockSvg} from '../assets/clock-svgrepo-com.svg'

const TaskArchive = ({ expanded }) => {

     const getClass = () => {

        if (expanded) {
            return ""
        } else {
            return "collapsed"
        }
    }
    
    const className = getClass()

    return(
        <>
            <button className="sidebarButton">
                <ClockSvg className="sidebarIcon" />
                <span className={className}>View Archived Tasks</span> 
            </button>
        </>
    )
}

export default TaskArchive