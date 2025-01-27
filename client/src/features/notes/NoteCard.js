import { Box, IconButton, List, ListItemButton, Popover, Stack, Typography } from '@mui/material'
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
import SquareIcon from '@mui/icons-material/Square';
import { paletteTheme } from './NoteList'


const NoteCard = ({ note, setFeedback }) => {

    const [editMode, setEditMode] = useState({ open: false, initialFocus: null })
    const [paletteAnchorEl, setPaletteAnchorEl] = useState(null)
    const isOpenPalette = Boolean(paletteAnchorEl)
    const colorTheme = paletteTheme[note.colorTheme || 0]
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [patchNote] = usePatchNoteMutation()
    const [deleteNote] = useDeleteNoteMutation()

    const handleOpenEditMode = useCallback((initialFocus) => setEditMode({ open: true, initialFocus }), [setEditMode])
    const handleCloseEditMode = useCallback(() => setEditMode({ open: false, initialFocus: null }), [setEditMode])

    const handleOpenPalette = useCallback((e) => {
        setPaletteAnchorEl(e.currentTarget)
    }, [setPaletteAnchorEl])

    const handleClosePalette = useCallback(() => {
        setPaletteAnchorEl(null)
    }, [setPaletteAnchorEl, isOpenPalette])

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
    }, [deleteNote, note.id, setFeedback])

    const handleChangeTheme = useCallback(async (themeNumber) => {
        try {
            await patchNote({ noteId: note.id, colorTheme: themeNumber }).unwrap()
            handleClosePalette()
            setTrueSuccess(true)

        } catch (error) {
            const message = 'Could not change note theme: ' + (error.data.message || 'Unknown error')
            setFeedback(message)
        }
    }, [patchNote, note.id, note.colorTheme, setFeedback])

    let content = (
        <Container sx={{ backgroundColor: colorTheme.bgColor ?? null }}>
            <Stack direction='row'>
                <InputWrapper onClick={() => handleOpenEditMode('title')}>
                    <Typography color={note.title ? colorTheme.color : colorTheme.dark}>
                        {note.title || 'Title'}
                    </Typography>
                </InputWrapper>

                <CustomIconButton Icon={<PushPinIcon />} ml='auto' func={handlePinNote} color={note.pinned ? 'orange': colorTheme.dark} />
            </Stack>

            <InputWrapper height='100%' onClick={() => handleOpenEditMode('body')}>
                <Typography color={note.body ? colorTheme.color : colorTheme.dark} variant='body2' sx={{ whiteSpace: 'pre-line' }}>
                    {note.body || 'Body'}
                </Typography>
            </InputWrapper>

            <Stack direction='row' mt='auto'>
                <CustomIconButton Icon={<NotificationsIcon fontSize='small' />} color={colorTheme.dark} />
                <CustomIconButton Icon={<GroupAddIcon fontSize='small' />} color={colorTheme.dark} />
                <CustomIconButton Icon={<PaletteIcon fontSize='small' />} func={handleOpenPalette} color={colorTheme.dark} />
                <Popover
                    open={isOpenPalette}
                    anchorEl={paletteAnchorEl}
                    onClose={handleClosePalette}
                    component={Box}
                >
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <CustomIconButton Icon={<SquareIcon />} color='#3f3f3e' func={() => handleChangeTheme(0)} />
                        <CustomIconButton Icon={<SquareIcon />} color='#A07414' func={() => handleChangeTheme(1)} />
                        <CustomIconButton Icon={<SquareIcon />} color='#76299F' func={() => handleChangeTheme(2)} />
                        <CustomIconButton Icon={<SquareIcon />} color='#969339' func={() => handleChangeTheme(3)} />
                    </Box>
                </Popover>
                <CustomIconButton Icon={<MoreVertIcon fontSize='small' />} color={colorTheme.dark} />
                <CustomIconButton Icon={<ArchiveIcon fontSize='small' />} func={handleArchiveNote} color={colorTheme.dark} />
                <CustomIconButton Icon={<DeleteIcon fontSize='small' />} func={handleDeleteNote} ml='auto' color={colorTheme.dark} />
            </Stack>

        </Container >
    )

    if (editMode.open) {
        return <EditNote
            handleCloseEditMode={handleCloseEditMode}
            note={note}
            initialFocus={editMode.initialFocus}
            setFeedback={setFeedback}
        />
    }

    return content
}

const memoized = memo(NoteCard)

export default memoized