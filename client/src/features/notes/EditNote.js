import { Box, IconButton, InputBase, Modal, styled } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { usePatchNoteMutation } from './notesApiSlice'

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


const EditNote = ({ noteTitle, noteBody, noteId, handleCloseEditMode, initialFocus, setFeedback }) => {

    const [open, setOpen] = useState(true)

    const titleRef = useRef()
    const bodyRef = useRef()
    const [title, setTitle] = useState(noteTitle ?? '')
    const [body, setBody] = useState(noteBody ?? '')

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
            await patchNote({ title, body, noteId }).unwrap()
            setOpen(false)
            handleCloseEditMode()
        } catch (error) {
            const message = 'Could not patch note: ' + (error.data.message || 'Unknown error')
            setFeedback(message)
            setOpen(false)
            handleCloseEditMode()
        }
    }, [handleCloseEditMode, title, body, noteId, patchNote, setFeedback])

    return (
        <Modal open={open} onClose={handleClose}>
            <Container>
                <InputWrapper>
                    <CustomInput value={title} onChange={handleChange(setTitle)} placeholder='Title' inputRef={titleRef} fullWidth />
                </InputWrapper>
                <InputWrapper>
                    <CustomInput value={body} onChange={handleChange(setBody)} placeholder='Body' inputRef={bodyRef} fullWidth multiline />
                </InputWrapper>
            </Container>
        </Modal>
    )
}

export default EditNote