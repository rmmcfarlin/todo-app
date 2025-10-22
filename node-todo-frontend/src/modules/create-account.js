import { useState } from 'react'

const CreateAccount = ({ setCreateAccount }) => {

    const [ userData, setUserData ] = useState({
        username: "",
        password: "",
        email: ""
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = () => {
        console.log(userData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="loginForm">
                <label for="username" className="loginFormLabel">Username:</label>
                <input name="username" id="username" onChange={(e) => handleChange(e)}></input>
                <label for="password" className="loginFormLabel">Password:</label>
                <input name="password" id="password" onChange={(e) => handleChange(e)}></input>
                <button type="submit">Login</button>
            </form> 
        </div>
    )

}

export default CreateAccount