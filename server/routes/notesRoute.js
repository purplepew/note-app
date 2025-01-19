import express from 'express'
import { deleteAllNotes, deleteNote, getAllNotes, patchNote, postNewNote } from '../controller/notesController.js'
import verifyJwt from '../middleware/verifyJwt.js'

const router = express.Router()

router.use(verifyJwt)

router.route('')
.get(getAllNotes)
.post(postNewNote)
.patch(patchNote)
.delete(deleteNote)

router.route('/delete')
.delete(deleteAllNotes)

export default router