import {useState} from 'react'
import profilePlaceholder from '../assets/profilepicplaceholder.webp'
import {ReactComponent as CarrotIcon} from '../assets/down-arrow.svg'
import {ReactComponent as SettingsIcon} from '../assets/settings.svg'
import {ReactComponent as ProfileIcon} from '../assets/profile.svg'
import {ReactComponent as LogoutIcon} from '../assets/logout.svg'
import { useUser } from '../context/user-context'

const UserProfile = ({ domain, expanded, profileExpanded, setProfileExpanded, userData, setRefreshTrigger }) => {

    const { userName, setLoggedIn, setIsLoggingOut, setAccessToken } = useUser()
    

    const handleLogout = async () => {

        if (window.confirm("Are you sure you want to logout?")) {

            try {
            setIsLoggingOut(true)
            const response = await fetch(`${domain}/users/logout`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })
            if (!response.ok) throw new Error("Faled to logout")
            
            console.log("logging out")
            setLoggedIn(false)
            setAccessToken("")

            setTimeout(() => {
                setIsLoggingOut(false)
                }, 1000)

        } catch (err) {
            console.log(err)
        }
        }   
    }

    const handleProfileDropdown = () => {
        setProfileExpanded(!profileExpanded)
    }

    const getClass = () => {

        if (expanded) {
            return ""
        } else {
            return "collapsed"
        }
    }

    const getArrowClass = () => {

        if (expanded && profileExpanded) {
            return "dropdownIcon expanded"
        } else if (!expanded) {
            return "dropdownIcon sidebarCollapsed"
        } else if (expanded) {
            return "dropdownIcon"
        } 
    }
    
    const className = getClass()
    const arrowClassName = getArrowClass()
    
    return (
        <div className='userProfileFooter'>
            <div className='profileBanner'>
                <img src={profilePlaceholder} className="profilePicture"></img>
                <span className={className}>{userName}</span>
                <CarrotIcon className={arrowClassName} onClick={handleProfileDropdown} />
            </div>
            {profileExpanded && expanded ? (
                   <div className="profileButtons">
                <button className="profileButton">
                    <ProfileIcon className="profileIcon" />
                    <span>Profile</span>
                </button>
                <button className="profileButton">
                    <SettingsIcon className="profileIcon" />
                    <span>Settings</span>
                </button>
                <button className="profileButton" onClick={handleLogout}>
                    <LogoutIcon className="profileIcon" />
                    <span>Log Out</span>
                </button>
            </div>
            ) : (
                <></>
            )}
        </div>
        
    )
}

export default UserProfile