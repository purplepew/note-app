import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        default: 'Regular'
    },
    notes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Note',
        }
    ]
})

export default mongoose.model('User', usersSchema)