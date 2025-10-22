import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'


const data = {
    username: "test",
    password: "test1234",
    email: "test@test.com"
}

const wrongPw = "test12345"

const secret = process.env.PORT

console.log(secret)

    const pwHash = await bcrypt.hash(data.password, 10)
    const newUser = ({...data, "password": pwHash})

  if (await bcrypt.compare(data.password, pwHash)) {
            const accessToken = jsonwebtoken.sign({ userId: data.username }, 
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: "1d" }
            )
            console.log({accessToken, message: "Login successful"})
        }  else {
            console.log({ message: "Incorrect password."})
        }