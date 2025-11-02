
export const newUserValidation = (req, res, next) => {

    try {

        const passwordRegex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        const {email, password, passwordConfirmation, firstName } = req.body

        console.log(firstName)

        if (!firstName || !email || !password || !passwordConfirmation) {
            return res.status(400).json({ error: "Incomplete form submitted, missing one or more required fields."})
        }

        if (password !== passwordConfirmation) {
            return res.status(400).json({error: "Passwords do not match"})
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({error: "Invalid password submitted, must be 8 characters with at least 1 number and 1 special character"})
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid email address submitted"})
        }

    
        next()

    } catch {
        return res.status(500).json({error: "Unable to validate form submission"})
    }
}