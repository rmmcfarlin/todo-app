import { Router } from 'express'
import mongoose from 'mongoose'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Create User

router.post("/create-account", async (req,res) => {

    try{
        const data = req.body

        const pwHash = await bcrypt.hash(data.password, 10)
        const newUser = ({...data, "password": pwHash})

        const createUser = await User.create(newUser)
        return res.status(201).json({ message: "User created", id: createUser._id})

    } catch {
        return res.status(500).json({ error: "Unable to create user" })
    }
  }
)
// Login

router.post("/login", async (req,res) => {

    try{
        const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({ error: "Missing email / password"})
            }

        const loginInfo = await User.findOne({ email })
            if (!loginInfo) {
                return res.status(404).json({ error: "Username not found"})
            }

        console.log(`${loginInfo._id}`)
        const correctPw = loginInfo.password
        if (await bcrypt.compare(password, correctPw)) {
            const accessToken = jsonwebtoken.sign(
                { userId: `${loginInfo._id}` }, 
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: "15min" }
            )
            console.log("Access:", jsonwebtoken.decode(accessToken))
            console.log(accessToken)

            const refreshToken = jsonwebtoken.sign(
                { userId: `${loginInfo._id}` },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: "7d" }
            )

            return res
                .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    sameSite: 'Lax',
                    secure: false,
                    path: "/users/refresh",
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                })
                .status(200)
                .json({ accessToken, message: "Login successful"})

        }  else {
            return res.status(401).json({ message: "Incorrect password."})
        }
    } catch {
        return res.status(500).json({ error: "Unable to login"})
    }
  }
)

// Refresh Access Token

router.post("/refresh", async (req,res) => {
    const refreshCookie = req.cookies.refreshToken

    try {
        if (!refreshCookie) {
            return res.status(401).json({ message: "No refresh token set, unable to authorize"})
        }

        const decoded = jsonwebtoken.verify(refreshCookie, process.env.JWT_REFRESH_SECRET)

        const accessToken = jsonwebtoken.sign({ userId: decoded._id }, 
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: "15min" }
        )

        res.status(201).json({ accessToken, message: "Refresh Succesful"})

    } catch {
        return res.status(500).json({ error: "Unable to refresh"})
    }
})

// Logout

router.post("/logout", async (req,res) => {
    const refreshCookie = req.cookies.refreshToken;

    try {
       res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/users/refresh",
        })

        return res.status(200).json({ message: `Logged out successfully` });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired refresh token" });
    }
})

export default router