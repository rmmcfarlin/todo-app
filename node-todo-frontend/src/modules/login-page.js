import { useState } from 'react'
import ToDoLogo from "../assets/todo-logo-charcoal.png"
import CreateAccount from './create-account'

const LoginPage = ({ domain, loggedIn, setLoggedIn }) => {

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
      if (!response.ok) throw new Error("Login unsuccessful")
      
      setLoginForm({
        username: "",
        password: ""
      })

      if (response.ok) setLoggedIn(true)
    }

    const handleCreateAccount = () => {
        setCreateAccount(true)
    }

    return(
        <>
            {createAccount ? (
                <CreateAccount />
            ) : (
                <div className="loginPageBody">
                    <img src={ToDoLogo} className="loginPageLogo"></img>
                        <div className="loginContainer">
                            <p>Welcome Back</p>
                            <form onSubmit={handleSubmit} className="loginForm">
                                <label for="username" className="loginFormLabel">Username:</label>
                                <input name="username" id="username" onChange={(e) => handleChange(e)}></input>
                                <label for="password" className="loginFormLabel">Password:</label>
                                <input name="password" id="password" onChange={(e) => handleChange(e)}></input>
                                <div className="loginButtonContainer">
                                    <button type="submit">Login</button>
                                    <button onClick={handleCreateAccount}>Create Account</button>
                                </div>
                            </form>  
                            <button className="loginButtonSecondary">Forgot Password?</button>
                        </div>
                    </div>
            )}
        </>
    )
}

export default LoginPage