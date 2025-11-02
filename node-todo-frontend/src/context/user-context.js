import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState(null) 
    const [accessToken, setAccessToken] = useState("")
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [userName, setUserName] = useState('')

      const value = {
        accessToken,
        setAccessToken,
        loggedIn,
        setLoggedIn,
        currentUser,
        setCurrentUser,
        userName,
        setUserName,
        isLoggingOut,
        setIsLoggingOut
      }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}

export const useUser = () => useContext(UserContext)