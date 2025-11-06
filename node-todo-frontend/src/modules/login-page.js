import { useState } from 'react'
import ToDoLogo from "../assets/todo-logo-charcoal.png"
import CreateAccount from './create-account'
import { useUser } from '../context/user-context'

const LoginPage = ({ domain, setRefreshTrigger }) => {

    const { loggedIn, setLoggedIn, accessToken, setAccessToken, setUserName } = useUser()

    const [ createAccount, setCreateAccount ] = useState(false)
    const [ loginForm, setLoginForm ] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginForm(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`${domain}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(loginForm)
        }
      )
      if (!response.ok) {
        alert("Incorrect username or password")
      }

        const { accessToken, userName } = await response.json()
          setAccessToken(accessToken)
          setUserName(userName)
          setLoggedIn(true)
      
      setLoginForm({
        email: "",
        password: ""
      })

      if (response.ok) setLoggedIn(true)
    }

    const handleCreateAccount = () => {
        setCreateAccount(true)
    }

    return(
        <>
            <div className="loginPageBody">
                <img src={ToDoLogo} className="loginPageLogo"></img>
                    
            {createAccount ? (
                <CreateAccount domain={domain} setRefreshTrigger={setRefreshTrigger} />
            ) : (
                 <div className="loginContainer">
                            <p>Welcome Back</p>
                            <form onSubmit={handleSubmit} className="loginForm">
                                <label for="email" className="loginFormLabel">Email Address:</label>
                                <input name="email" required id="email" onChange={(e) => handleChange(e)}></input>
                                <label for="password" className="loginFormLabel">Password:</label>
                                <input name="password" required type="password" id="password" onChange={(e) => handleChange(e)}></input>
                                <div className="loginButtonContainer">
                                    <button type="submit">Login</button>
                                    <button onClick={handleCreateAccount}>Create Account</button>
                                </div>
                            </form>  
                            <button className="loginButtonSecondary">Forgot Password?</button>
                        </div>
            )}
            </div>
        </>
    )
}

export default LoginPage