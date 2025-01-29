import React, { useCallback } from 'react'
import { CustomIconButton } from './NoteList'
import { usePatchNoteMutation } from './notesApiSlice'
import ArchiveIcon from '@mui/icons-material/Archive'


const NoteCardArchiveBtn = ({ setFeedback, note, colorTheme }) => {

    const [patchNote] = usePatchNoteMutation()


    const handleArchiveNote = useCallback(async () => {
        try {
            await patchNote({ noteId: note.id, archived: !note.archived }).unwrap()
        } catch (error) {
            const message = 'Failed: ' + (error.data.message || 'Unknown error')
            setFeedback(message)
        }
    }, [patchNote, note.id, note.archived, setFeedback])

    return (
        <CustomIconButton
            Icon={<ArchiveIcon fontSize='small' />}
            func={handleArchiveNote}
            color={colorTheme.dark}
            title="Archive"
        />

    )
}

export default NoteCardArchiveBtn