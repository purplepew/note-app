import express from 'express'
import { getAllUsers, getUserNotes, postNewUser, searchQuery } from '../controller/userController.js'

const router = express.Router()

router.route('')
.get(getAllUsers)
.post(postNewUser)

router.route('/:userId')
.get(getUserNotes)
.post(searchQuery)

export default router