import './stylesheets/App.css';
import { useState, useEffect } from 'react'
import AppWrapper from './modules/app-wrapper';
import LoginPage from './modules/login-page';
import { useUser } from './context/user-context';

const ContextWrapper = ({}) => {

    const { loggedIn, setLoggedIn, accessToken, setAccessToken, setCurrentUser, userName, setUserName, isLoggingOut, setIsLoggingOut } = useUser()

    const [checkingAuth, setCheckingAuth] = useState(true)
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [archivedTasks, setArchivedTasks] = useState([])
    const [error, setError] = useState(null)
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [viewCount, setViewCount] = useState("All")

    const taskData = { 
        tasks,
        setTasks,
        completedTasks,
        setCompletedTasks,
        archivedTasks,
        setArchivedTasks,
        viewCount,
        setViewCount
    }

  const domain = "http://localhost:3000"

      useEffect(() => {
        const authRefresh = async () => {

          if (isLoggingOut) return
          if (accessToken) return

          try {
            const authResponse = await fetch(`${domain}/users/refresh`, {
              method: "POST",
              headers: {"Content-Type": "application/JSON"},
              credentials: "include"
            }
          )

          if (!authResponse.ok) throw new Error("Unable to refresh")

          const { accessToken, message, userName } = await authResponse.json()


          setUserName(userName)
          setAccessToken(accessToken)
          setLoggedIn(true)
          setCheckingAuth(false)
        } catch{
          setCheckingAuth(false)
        }

        }
        authRefresh();
      }, [refreshTrigger])

  if (checkingAuth) {
    return(
      <div className="loadingScreen">
          <p>Loading...</p>
      </div>
    )
  }

  return(

    <div className="App">
          {loggedIn ? (
            <AppWrapper 
              domain={domain} 
              refreshTrigger={refreshTrigger}
              setRefreshTrigger={setRefreshTrigger}
              taskData={taskData}
            />
          ) : (
            <LoginPage 
                domain={domain}
                setRefreshTrigger={setRefreshTrigger} />
          )}
        </div>
  )

}

export default ContextWrapper