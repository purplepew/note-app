import React, { useCallback, useState } from 'react'
import Stack from '@mui/material/Stack'
import NoteList from '../features/notes/NoteList'
import NewNote from '../features/notes/NewNote'
import { Snackbar } from '@mui/material'
import useAuth from '../hooks/useAuth'

const Public = () => {
    const { id } = useAuth()
    const [feedback, setFeedbackState] = useState('')

    const setFeedback = useCallback((message) => {
        setFeedbackState(message)
    }, [])

    return (
        <Stack gap={2} sx={{ mt: 2, pb: 2 }}>
            <NewNote setFeedback={setFeedback} userId={id} />
            <NoteList setFeedback={setFeedback} userId={id} />
            <Snackbar message={feedback} open={Boolean(feedback)} onClose={() => setFeedback('')} autoHideDuration={4000} />
        </Stack>
    )
}

export default Public