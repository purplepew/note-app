import { Box, Button, IconButton, InputBase, Modal, Stack, styled } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { usePatchNoteMutation } from './notesApiSlice'
import { paletteTheme } from './NoteList'

const EditNoteContainer = styled(Box)(({ theme }) => ({
    paddingTop: '10px',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('md')]: {
        height: 400,
        width: 550,
    },
    [theme.breakpoints.down('sm')]: {
        top: '20%',
        left: '10%',
        transform: 'none',
        height: 350,
        width: 370,
    },

}))

const InputWrapper = styled(Box)(({ theme }) => ({
    padding: '10px',
}))

const CustomInput = styled(InputBase)(({ theme }) => ({
    color: theme.palette.primary.main,
    '& .MuiInputBase-input::placeholder': {
        color: theme.palette.primary.dark
    },
    whiteSpace: 'pre-line',
}))


const EditNote = ({ note, handleCloseEditMode, initialFocus, setFeedback }) => {
    const [open, setOpen] = useState(true)
    const colorTheme = paletteTheme[note?.colorTheme || 0]

    const titleRef = useRef()
    const bodyRef = useRef()
    const [title, setTitle] = useState(note?.title ?? '')
    const [body, setBody] = useState(note?.body ?? '')

    const [patchNote] = usePatchNoteMutation()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (initialFocus === 'title') {
                titleRef.current?.focus()
            } else {
                bodyRef.current?.focus()
            }
        }, 0)

        return () => clearTimeout(timer)
    }, [initialFocus])

    const handleChange = useCallback((setter) => (e) => setter(e.target.value), [])

    const handleClose = useCallback(async () => {
        try {
            await patchNote({ title, body, noteId: note.id }).unwrap()
            setOpen(false)
            handleCloseEditMode()
        } catch (error) {
            const message = 'Note NOT updated: ' + (error.data.message || 'Unknown error')
            setFeedback(message)
            setOpen(false)
            handleCloseEditMode()
        }
    }, [handleCloseEditMode, title, body, note.id, patchNote, setFeedback])

    return (
        <Modal open={open} onClose={handleClose}>
            <EditNoteContainer sx={{ backgroundColor: colorTheme.bgColor }}>
                <Stack>
                    <InputWrapper>
                        <CustomInput
                            value={title}
                            onChange={handleChange(setTitle)}
                            placeholder='Title'
                            inputRef={titleRef}
                            fullWidth
                            spellCheck={false}
                            sx={{ color: colorTheme.color }}
                        />
                    </InputWrapper>
                    <InputWrapper sx={{height: {xs: 300, md: 400}, overflowY: 'auto', backgroundColor: colorTheme.bgColor}}>
                        <CustomInput
                            value={body}
                            onChange={handleChange(setBody)}
                            placeholder='Body'
                            inputRef={bodyRef}
                            fullWidth
                            multiline
                            spellCheck={false}
                            sx={{ color: colorTheme.color }}
                        />
                    </InputWrapper>
                    <Stack sx={{padding: '20px', backgroundColor: colorTheme.bgColor, boxShadow: `0 -5px 10px 2px ${colorTheme.bgColor}`, zIndex: 4}}>
                        <Button onClick={handleClose} size='small' sx={{ml: 'auto', color: colorTheme.color}}>Close</Button>
                    </Stack>
                </Stack>
            </EditNoteContainer>
        </Modal>
    )
}

export default EditNote