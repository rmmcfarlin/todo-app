import {useState} from 'react'
import profilePlaceholder from '../assets/profilepicplaceholder.webp'

const UserProfile = ({ expanded }) => {

    const [username, setUserName] = useState('Ryan McFarlin')

    const getClass = () => {

        if (expanded) {
            return ""
        } else {
            return "collapsed"
        }
    }
    
    const className = getClass()
    
    return (
        <div className='userProfileFooter'>
            <img src={profilePlaceholder} className="profilePicture"></img>
            <span className={className}>{username}</span>
        </div>
        
    )
}

export default UserProfile