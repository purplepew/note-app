import React, { useCallback } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDeleteNoteMutation } from './notesApiSlice'
import { CustomIconButton } from './NoteList'

const NoteCardDeleteBtn = ({ setFeedback, note, colorTheme }) => {

    const [deleteNote] = useDeleteNoteMutation()

    const handleDeleteNote = useCallback(async () => {
        try {
            await deleteNote({ noteId: note.id }).unwrap()
        } catch (error) {
            const message = 'Failed: ' + (error.data.message || 'Unknown error')
            setFeedback(message)
        }
    }, [deleteNote, note.id, setFeedback])
    return (
        <CustomIconButton
            Icon={<DeleteIcon fontSize='small' />}
            func={handleDeleteNote}
            ml='auto'
            color={colorTheme.dark}
            title="Delete"
        />

    )
}

export default NoteCardDeleteBtn