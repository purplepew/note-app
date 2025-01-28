import React, { useCallback } from 'react'
import { CustomIconButton } from './NoteList'
import { usePatchNoteMutation } from './notesApiSlice'
import PushPinIcon from '@mui/icons-material/PushPin'


const NoteCardPinBtn = ({ setFeedback, note, colorTheme }) => {

    const [patchNote] = usePatchNoteMutation()

    const handlePinNote = useCallback(async () => {
        try {
            await patchNote({ noteId: note.id, pinned: !note.pinned }).unwrap()
        } catch (error) {
            const message = 'Could not pin note: ' + (error.data.message || 'Unknown error')
            setFeedback(message)
        }
    }, [patchNote, note.id, note.pinned, setFeedback])

    return (
        <CustomIconButton Icon={<PushPinIcon />} ml='auto' func={handlePinNote} color={note.pinned ? 'orange' : colorTheme.dark} />

    )
}

export default NoteCardPinBtn