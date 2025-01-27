import mongoose from 'mongoose'

const notesSchema = new mongoose.Schema({
    title: String,
    body: String,
    lastEditedAt: Date,
    pinned: {type: Boolean, default: false},
    archived: {type: Boolean, default: false},
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    colorTheme: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Note', notesSchema)