import { Stack, Typography } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteIcon from '@mui/icons-material/Delete'
import PushPinIcon from '@mui/icons-material/PushPin'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PaletteIcon from '@mui/icons-material/Palette'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useDeleteNoteMutation, usePatchNoteMutation } from './notesApiSlice'
import { Container, InputWrapper, CustomIconButton } from './NoteList'
import EditNote from './EditNote'

const NoteCard = ({ note, setFeedback }) => {

    const [editMode, setEditMode] = useState({ open: false, initialFocus: null })

    const [patchNote] = usePatchNoteMutation()
    const [deleteNote] = useDeleteNoteMutation()

    const handleOpenEditMode = useCallback((initialFocus) => setEditMode({ open: true, initialFocus }), [setEditMode])
    const handleCloseEditMode = useCallback(() => setEditMode({ open: false, initialFocus: null }), [setEditMode])

    const handlePinNote = useCallback(async () => {
        try {
            await patchNote({ noteId: note.id, pinned: !note.pinned }).unwrap()
        } catch (error) {
            const message = 'Could not pin note: ' + (error.data.message || 'Unknown error')
            setFeedback(message)
        }
    }, [patchNote, note.id, note.pinned, setFeedback])

    const handleArchiveNote = useCallback(async () => {
        try {
            await patchNote({ noteId: note.id, archived: !note.archived }).unwrap()
        } catch (error) {
            const message = 'Could not archive note: ' + (error.data.message || 'Unknown error')
            setFeedback(message)
        }
    }, [patchNote, note.id, note.archived, setFeedback])

    const handleDeleteNote = useCallback(async () => {
        try {
            await deleteNote({ noteId: note.id }).unwrap()
        } catch (error) {
            const message = 'Could not delete note: ' + (error.data.message || 'Unknown error')
            setFeedback(message)
        }
    }, [patchNote, note.id, setFeedback])

    let content = (
        <Container>
            <Stack direction='row'>
                <InputWrapper onClick={() => handleOpenEditMode('title')}>
                    <Typography color={note.title ? 'inherit' : 'primary.dark'}>
                        {note.title || 'Title'}
                    </Typography>
                </InputWrapper>

                <CustomIconButton Icon={<PushPinIcon />} ml='auto' func={handlePinNote} color={note.pinned ? 'primary.main' : undefined}/>
            </Stack>

            <InputWrapper height='100%' onClick={() => handleOpenEditMode('body')}>
                <Typography color={note.body ? 'inherit' : 'primary.dark'} variant='body2' sx={{ whiteSpace: 'pre-line' }}>
                    {note.body || 'Body'}
                </Typography>
            </InputWrapper>

            <Stack direction='row' mt='auto'>
                <CustomIconButton Icon={<NotificationsIcon fontSize='small' />} />
                <CustomIconButton Icon={<GroupAddIcon fontSize='small' />} />
                <CustomIconButton Icon={<PaletteIcon fontSize='small' />} />
                <CustomIconButton Icon={<MoreVertIcon fontSize='small' />} />
                <CustomIconButton Icon={<ArchiveIcon fontSize='small' />} func={handleArchiveNote} />
                <CustomIconButton Icon={<DeleteIcon fontSize='small' />} func={handleDeleteNote} ml='auto' />
            </Stack>

        </Container>
    )

    if (editMode.open) {
        return <EditNote
            handleCloseEditMode={handleCloseEditMode}
            noteTitle={note.title}
            noteBody={note.body}
            noteId={note.id}
            initialFocus={editMode.initialFocus}
            setFeedback={setFeedback}
        />
    }

    return content
}

const memoized = memo(NoteCard)

export default memoized