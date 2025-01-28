import express from 'express'
import { getAllUsers, getUserNotes, postNewUser } from '../controller/userController.js'

const router = express.Router()

router.route('')
.get(getAllUsers)
.post(postNewUser)

router.route('/:userId')
.get(getUserNotes)

export default router