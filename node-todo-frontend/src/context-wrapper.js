import './stylesheets/App.css';
import { useState, useEffect } from 'react'
import AppWrapper from './modules/app-wrapper';
import LoginPage from './modules/login-page';
import { useUser } from './context/user-context';

const ContextWrapper = ({}) => {

    const { loggedIn, setLoggedIn, accessToken, setAccessToken, setCurrentUser } = useUser()

    const [checkingAuth, setCheckingAuth] = useState(true)
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [archivedTasks, setArchivedTasks] = useState([])
    const [error, setError] = useState(null)
    const [refreshTrigger, setRefreshTrigger] = useState(0)


  const domain = "http://localhost:3000"
      useEffect(() => {
        const authRefresh = async () => {

          if (accessToken) {
            return
          }

          try {
            const authResponse = await fetch(`${domain}/users/refresh`, {
              method: "POST",
              headers: {"Content-Type": "application/JSON"},
              credentials: "include"
            }
          )

          if (!authResponse.ok) throw new Error("Unable to refresh")

          const { accessToken, user } = await authResponse.json()
          setAccessToken(accessToken)
          setCurrentUser(user)
          setLoggedIn(true)
          setCheckingAuth(false)
        } catch{
          setAccessToken(null)
          setCurrentUser(null)
          setCheckingAuth(false)
          setLoggedIn(false)
        }

        }
        authRefresh();
      }, [refreshTrigger])

      useEffect(() => {
            const fetchData = async () => {
            try {
               const response = await fetch(`${domain}/tasks`)
               if (!response.ok) {
                throw new Error("Network response not ok")
               }

               const data = await response.json();

               const userTasks = Object.values(data).flat()
               const uncompletedTasks = userTasks.filter(task => task.completed === false && task.archived === false)
               const completedTasks = userTasks.filter(task => task.completed === true && task.archived === false)
               const archivedTasks = userTasks.filter(task => task.archived === true)

               setTasks(uncompletedTasks)
               setCompletedTasks(completedTasks)
               setArchivedTasks(archivedTasks)
        
               console.log(accessToken)

            } catch (err) {
                console.log(err)
                setError(err.message)
            }
        }
        fetchData();
    }, [refreshTrigger]) 

  if (checkingAuth) {
    return(
      <div className="loadingScreen">

      </div>
    )
  }

  return(

    <div className="App">
          {loggedIn ? (
            <AppWrapper 
              domain={domain} 
              tasks={tasks} 
              setTasks={setTasks} 
              setCompletedTasks={setCompletedTasks} 
              completedTasks={completedTasks}
              archivedTasks={archivedTasks}
              setArchivedTasks={setArchivedTasks}
              refreshTrigger={refreshTrigger}
              setRefreshTrigger={setRefreshTrigger}
            />
          ) : (
            <LoginPage domain={domain} setRefreshTrigger={setRefreshTrigger} />
          )}
        </div>
  )

}

export default ContextWrapper