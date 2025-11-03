import { useState } from 'react'
import { useUser } from '../context/user-context'

const CreateAccount = ({ domain, setCreateAccount, setRefreshTrigger }) => {

    const { accessToken, setAccessToken } = useUser()
    
    const [ userData, setUserData ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    const passwordRegex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (userData.password !== userData.passwordConfirmation) {
            alert("Password and confirmation do not match")
            return
        }

        if (!passwordRegex.test(userData.password)) {
            alert("Password must be at least 8 characters and contain at least 1 number and one special character.")
        }

        try {
            const response = await fetch(`${domain}/users/create-account`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(userData)
            })
            if (!response.ok) throw new Error("Unable to create account")
            
            const { token, message } = await response.json()

            alert(message)

            setAccessToken(token)

            setRefreshTrigger(prev => prev + 1)
            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="createAccountForm">
            <p>Create Your Account</p>
            <form onSubmit={(e) => handleSubmit(e)} className="">
                <label for="firstName" className="loginFormLabel">First Name*</label>
                <input name="firstName" id="firstName" type="text" required onChange={(e) => handleChange(e)}></input>
                <label for="lastName" className="loginFormLabel">Last Name</label>
                <input name="lastName" id="lastName" type="text" onChange={(e) => handleChange(e)}></input>
                <label for="email" className="loginFormLabel" >Email Address*</label>
                <input name="email" type="email" id="email" required onChange={(e) => handleChange(e)}></input>
                <label for="password" className="loginFormLabel">Password*</label>
                <input name="password" id="password" type="password" required onChange={(e) => handleChange(e)}></input>
                <label for="passwordConfirmation" className="loginFormLabel">Confirm Password*</label>
                <input name="passwordConfirmation" type="password" required id="passwordConfirmation" onChange={(e) => handleChange(e)}></input>
                <button type="submit">Create Account</button>
                <span>*Required</span>
            </form> 
        </div>
    )

}

export default CreateAccount