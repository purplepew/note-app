import mongoose from 'mongoose'

const dbConnect = async () => {
    if (!process.env.DATABASE_URI) {
        throw new Error('DATABASE_URI is not set')
    }

    await mongoose.connect(process.env.DATABASE_URI)
}

export default dbConnect