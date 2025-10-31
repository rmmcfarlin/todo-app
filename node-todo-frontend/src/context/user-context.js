import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState(null) 
    const [accessToken, setAccessToken] = useState("")

      const value = {
        accessToken,
        setAccessToken,
        loggedIn,
        setLoggedIn,
        currentUser,
        setCurrentUser
      }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}

export const useUser = () => useContext(UserContext)