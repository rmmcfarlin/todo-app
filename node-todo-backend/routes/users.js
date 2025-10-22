import { Router } from 'express'
import mongoose from 'mongoose'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

const router = Router()

// Create User

router.post("/create-account", async (req,res) => {

    try{
        const data = req.body

        const pwHash = await bcrypt.hash(data.password, 10)
        const newUser = ({...data, "password": pwHash})

        const createUser = await User.create(newUser)
        res.status(201).json({ message: "User created", id: createUser._id})

    } catch {
        res.status(500).json({ error: "Unable to create user" })
    }
  }
)
// Login

router.post("/login", async (req,res) => {

    try{
        const { username, password } = req.body
            if (!username || !password) {
                return res.status(400).json({ error: "Missing username / password"})
            }

        const loginInfo = await User.findOne({ username })
            if (!loginInfo) {
                return res.status(404).json({ error: "Username not found"})
            }
    
        const correctPw = loginInfo.password
        if (await bcrypt.compare(password, correctPw)) {
            const accessToken = jsonwebtoken.sign({ userId: loginInfo._id }, 
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: "1d" }
            )
            return res.status(200).json({ accessToken, message: "Login successful"})
        }  else {
            return res.status(401).json({ message: "Incorrect password."})
        }
    } catch {
        return res.status(500).json({ error: "Unable to login"})
    }
  }
)

export default router