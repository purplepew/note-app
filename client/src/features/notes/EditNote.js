import { Box, IconButton, InputBase, Modal, styled } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { usePatchNoteMutation } from './notesApiSlice'
import { paletteTheme } from './NoteList'

const Container = styled(Box)(({ theme }) => ({
    height: 500,
    width: 700,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: theme.shape.borderRadius,
    overflowY: 'auto'
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
    const colorTheme = paletteTheme[note.colorTheme || 0]

    const titleRef = useRef()
    const bodyRef = useRef()
    const [title, setTitle] = useState(note.title ?? '')
    const [body, setBody] = useState(note.body ?? '')

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
            <Container sx={{ backgroundColor: colorTheme.bgColor }}>
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
                <InputWrapper>
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
            </Container>
        </Modal>
    )
}

export default EditNote