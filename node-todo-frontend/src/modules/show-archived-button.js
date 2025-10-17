import {ReactComponent as ClockSvg} from '../assets/clock-svgrepo-com.svg'

const ShowArchivedButton = ({ expanded, showArchived, setShowArchived, className }) => {

    const handleShowArchive = () => {

        let archivedState = showArchived
        setShowArchived(!showArchived)
        
        console.log(archivedState)
    }

    const getClass = () => {
        if (expanded) {
            return ""
        } else {
            return "collapsed"
        }
    }
    
    const textClass = getClass()
    
    return(
          <button className="sidebarButton" onClick={handleShowArchive}>
                <ClockSvg className="sidebarIcon" />
                <span className={textClass}>View Archived Tasks</span> 
            </button>
    )
}

export default ShowArchivedButton