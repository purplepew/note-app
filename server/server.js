import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import dbConnect from './config/dbConnect.js'
import errorHandler from './middleware/errorHandler.js'
import notesRoute from './routes/notesRoute.js'
import usersRoute from './routes/usersRoute.js'
import authRoute from './routes/authRoute.js'

dotenv.config()

const app = express()
const PORT = 3500

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: true}))

app.use('/notes', notesRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)

app.use(errorHandler)

const startServer = async () => {
    try {
        await dbConnect()

        app.listen(PORT, () => {
            console.log('Connected to the db')
            console.log('Server running on PORT ' + PORT)
        })
    } catch (error) {
        console.error('Failed to connect to the database')
        console.error(error)
        process.exit(1)
    }
}

startServer()
