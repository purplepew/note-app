import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'
import User from '../models/users/User.js'
import bcrypt from 'bcrypt'

const issueAuthTokens = (res, foundUser) => {
    const accessToken = jwt.sign(
        {
            UserInfo: {
                username: foundUser.username,
                role: foundUser.role,
                id: foundUser._id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' }
    )

    const refreshToken = jwt.sign(
        {
            username: foundUser.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '20m' }
    )

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 1000 * 60 * 60 * 24 * 10 })

    return res.json({ accessToken })
}

export const login = AsyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.sendStatus(400)

    const foundUser = await User.findOne({ username }).exec()
    if (!foundUser) return res.status(404).json({ message: 'Cannot find user' })

    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(400).json({ message: 'Incorrect password' })

    issueAuthTokens(res, foundUser)
})

export const signup = AsyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.sendStatus(400)

    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicate) return res.status(409).json({ message: 'Username already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        username,
        password: hashedPassword
    })

    issueAuthTokens(res, newUser)
})

export const refresh = AsyncHandler(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({message: 'Forbidden'})

            const foundUser = await User.findOne({ username: decoded.username }).lean().exec()
            if (!foundUser) return res.status(404).json({ message: 'Cannot find user' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "role": foundUser.role,
                        "id": foundUser._id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' }
            )

            res.json({ accessToken })
        }
    )

})

export const logout = AsyncHandler(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' })
    res.json({ message: 'Cookie cleared' })
})