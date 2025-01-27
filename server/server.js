dotenv.config()
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

dbConnect()

const app = express()
const PORT = 3500

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: true}))

app.listen(PORT, ()=>{
    console.log('Server running on PORT ' + PORT)
})
 
mongoose.connection.on('open', () => {
    console.log('Connected to the db')
})

app.use('/notes', notesRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)

app.use(errorHandler)
