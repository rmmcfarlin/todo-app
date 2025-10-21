import { useState } from 'react'
import ToDoLogo from "../assets/todo-logo-charcoal.png"
import e from 'cors'

const LoginPage = ({}) => {

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

    const handleSubmit = () => {
        console.log(loginForm)
    }

    return(
        <div className="loginPageBody">
            <img src={ToDoLogo} className="loginPageLogo"></img>
            <div className="loginContainer">
                <p>Welcome Back</p>
                <form onSubmit={handleSubmit} className="loginForm">
                    <label for="username" className="loginFormLabel">Username:</label>
                    <input name="username" id="username" onChange={() => handleChange(e)}></input>
                    <label for="password" className="loginFormLabel">Password:</label>
                    <input name="password" id="password" onChange={() => handleChange(e)}></input>
                    <div className="loginButtonContainer">
                        <button type="submit">Login</button>
                        <button>Create Account</button>
                    </div>
                </form>  
                <button className="loginButtonSecondary">Forgot Password?</button>
            </div>
        </div>
    )
}

export default LoginPage