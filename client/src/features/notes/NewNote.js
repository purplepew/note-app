import { Box, ClickAwayListener, Collapse, InputBase, styled } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { usePostNewNoteMutation } from './notesApiSlice'

const CustomInput = styled(InputBase)(({ theme }) => ({
    color: theme.palette.primary.main,
    '& .MuiInputBase-input::placeholder': {
        color: theme.palette.primary.dark
    },
    width: '100%',
    maxWidth: 350,
    overflowWrap: 'break-word'
}))

const InputWrapper = styled(Box)(({ theme }) => ({
    padding: '10px',

}))

const Container = styled(Box)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    width: 350,
}))


const NewNote = ({ userId, setFeedback }) => {
    const titleRef = useRef()
    const bodyRef = useRef()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const [open, setOpen] = useState(false)

    const [postNewNote] = usePostNewNoteMutation()

    const handleOpen = useCallback(() => setOpen(true), [])
    const handleClose = useCallback(() => setOpen(false), [])

    const handleChange = useCallback((setter) => e => setter(e.target.value), [])

    const handlePostNewNote = useCallback(async () => {
        if(!open) return null

        if (!title && !body) {
            setFeedback('Empty note discarded')
            return handleClose()
        }

        try {
            await postNewNote({ title, body, userId }).unwrap()
            setTitle('')
            setBody('')
            handleClose()
        } catch (error) {
            const message = 'Not created: ' + (error.data.message || 'Error')
            setFeedback(message)
            handleClose()
        }
    }, [open, title, body, userId, setFeedback, handleClose, postNewNote])

    const handleEnter = useCallback((event) => {
        if (event.key === 'Enter') {
            bodyRef.current.focus()
            event.preventDefault()
        }
    }, [])

    const handleBackspace = useCallback((event) => {
        if (event.key === 'Backspace') titleRef.current.focus()
    }, [])

    useEffect(() => {
        const currentTitleRef = titleRef.current
        currentTitleRef?.addEventListener('keydown', handleEnter)

        return () => {
            currentTitleRef?.removeEventListener('keydown', handleEnter)
        }
    }, [handleEnter])

    useEffect(() => {
        const currentBodyRef = bodyRef.current
        if (body.length === 0) currentBodyRef?.addEventListener('keydown', handleBackspace)

        return () => {
            currentBodyRef?.removeEventListener('keydown', handleBackspace)
        }
    }, [handleBackspace, body.length])

    return (
        <ClickAwayListener onClickAway={handlePostNewNote}>
            <Container>

                <Collapse in={open}>
                    <InputWrapper>
                        <CustomInput
                            value={title}
                            onChange={handleChange(setTitle)}
                            placeholder='Title'
                            inputRef={titleRef}
                            autoComplete='off'
                            spellCheck={false}
                        />
                    </InputWrapper>
                </Collapse>

                <InputWrapper>
                    <CustomInput
                        value={body}
                        onChange={handleChange(setBody)}
                        placeholder='Take a note'
                        inputRef={bodyRef}
                        spellCheck={false}
                        autoComplete='off'
                        multiline
                        maxRows={10}
                        onFocus={handleOpen}
                    />
                </InputWrapper>

            </Container >
        </ClickAwayListener>
    )
}

export default NewNote