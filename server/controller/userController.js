import User from '../models/users/User.js'
import AsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'

export const getAllUsers = AsyncHandler(async (req, res) => {

    const users = await User.find({}).lean().exec()

    res.json(users)
})


export const postNewUser = AsyncHandler(async (req, res) => {
    const {
        username,
        password,
        roles,
        note = []
    } = req.body
    if (!username || !password) return res.sendStatus(400)

    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicate) return res.sendStatus(409)

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username,
        password: hashedPassword,
        roles,
        note
    })

    res.json(user)
})

export const getUserNotes = AsyncHandler(async (req, res) => {
    const { userId } = req.params

    const foundUser = await User.findById(userId).exec()

    const { notes } = await foundUser.populate({
        path: 'notes',
        options: { sort: { lastEditedAt: -1 } }
    });

    res.json(notes)
})

export const getUserArchivedNotes = AsyncHandler(async (req, res) => {
    const { userId } = req.params

    const foundUser = await User.findById(userId).exec()

    const { notes } = await foundUser.populate({
        path: 'notes',
        options: { sort: { lastEditedAt: -1 } }
    });

    const archivedNotes = notes.filter(note => note.archived)

    res.json(archivedNotes)
})