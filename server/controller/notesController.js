import Note from '../models/notes/Note.js'
import User from '../models/users/User.js'
import AsyncHandler from 'express-async-handler'

export const getAllNotes = AsyncHandler(async (req, res) => {
    const notes = await Note.find({}).lean().exec()

    if (!notes) return res.status(204).json({ message: 'No notes were found' })

    res.json(notes)
})

export const postNewNote = AsyncHandler(async (req, res) => {
    const {
        userId,
        title = '',
        body = '',
    } = req.body

    if (!userId) return res.status(401).json({ message: 'User ID is required' })

    if (!title && !body) return res.status(400).json({ message: 'Both input fields are required' })

    const foundUser = await User.findById(userId).exec()
    if (!foundUser) return res.status(404).json({ message: 'Cannot user' })

    const note = await Note.create({
        title,
        body,
        lastEditedAt: new Date().toISOString(),
        user: userId,
        colorTheme: 0
    })

    foundUser.notes.push(note._id)

    await foundUser.save()

    res.json(note)
})

export const patchNote = AsyncHandler(async (req, res) => {
    const {
        noteId,
        title,
        body,
        pinned,
        archived,
        colorTheme
    } = req.body


    if (!noteId) return res.status(400).json({ message: 'Note ID is required' })

    const note = await Note.findById(noteId).exec()

    if (!note) return res.status(404).json({ message: 'Note not found' })

    let isModified = false

    if (title && note.title !== title) {
        note.title = title
        isModified = true
    }

    if (body && note.body !== body) {
        note.body = body
        isModified = true
    }

    if (!isModified && archived === undefined && pinned === undefined && colorTheme === undefined) {
        return res.status(400).json({ message: 'No changes were made' })
    }

    if (note.archived !== archived && archived !== undefined) {
        note.archived = archived
    }

    if (note.pinned !== pinned && pinned !== undefined) {
        note.pinned = pinned
    }
    console.log(colorTheme)
    if (note.colorTheme !== colorTheme && colorTheme !== undefined) {
        if (colorTheme >= 0 && colorTheme <= 3) {
            note.colorTheme = colorTheme
            console.log(1)
        }
        console.log(2)
    }
    console.log(3)

    if (isModified) {
        note.lastEditedAt = new Date().toISOString()
    }

    await note.save()

    res.json({ message: 'Saved.' })

})

export const deleteNote = AsyncHandler(async (req, res) => {
    const { noteId } = req.body
    if (!noteId) return res.status(400).json({ message: 'Note ID is required' })

    const note = await Note.findById(noteId).exec()
    if (!note) return res.status(204).json({ message: 'Note does not exist' })

    await note.deleteOne()

    res.json({ message: 'Deleted.' })
})

export const deleteAllNotes = AsyncHandler(async (req, res) => {
    try {
        await Note.deleteMany()
        res.json({ message: 'all deleted bro' })
    } catch (error) {

    }
})