import {ReactComponent as SearchIcon} from '../assets/search.svg'

const ShowSearchButton = ({ expanded, showSearch, setShowSearch, className }) => {

    const handleShowArchive = () => {
        setShowSearch(!showSearch)
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
                <SearchIcon className="sidebarIcon" />
                <span className={textClass}>Search Tasks</span> 
            </button>
    )
}

export default ShowSearchButton