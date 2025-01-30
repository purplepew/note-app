import { Box, ClickAwayListener, Collapse, IconButton, InputBase, List, ListItemButton, ListItemText, Paper, Stack, styled } from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useNoteSearchQueryMutation, usePatchNoteMutation } from '../features/notes/notesApiSlice'
import useAuth from '../hooks/useAuth'


const SearchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 0 0 10px',

}))

const CustomInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input::placeholder': {
        color: theme.palette.primary.dark
    },
    color: theme.palette.primary.main,
    display: 'flex',
    width: 175
}))

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
    padding: 0
}))

const CustomListText = styled(ListItemText)(({ theme }) => ({
    '& > span': {
        color: '#fff'
    },
    '& > p': {
        color: '#777'
    }
}))

const HeaderSearchBtn = ({setFeedback}) => {
    const { id } = useAuth()

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [queryResult, setQueryResult] = useState([])
    const inputRef = useRef()

    const [searchQuery] = useNoteSearchQueryMutation()
    const [patchNote] = usePatchNoteMutation()

    const handleChange = async (e) => {
        setTitle(e.target.value)
        if (title) {
            try {
                const result = await searchQuery({ userId: id, query: e.target.value }).unwrap()
                setQueryResult(result)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleOpen = useCallback(async () => {
        if (open) return
        setOpen(true)
        setTimeout(() => inputRef?.current?.focus(), 5)
    }, [inputRef, open])

    const handleClose = useCallback(async () => {
        if(!open) return
        console.log('triggered')
        setOpen(false)
        setQueryResult([])
        setTitle('')
    }, [open])

    const handleClickResult = useCallback(async (noteId) => {
        try {
            await patchNote({ forceUpdate: true, noteId }).unwrap()
        } catch (error) {
            const message = error.data.message || 'Error'
            setFeedback(message)
        }
    }, [patchNote, setFeedback])

    const renderResult = queryResult?.map(note => {

        const primaryText = `${note.title.substring(0, 20)}${note.title.length > 20 ? '...' : ''}`
        const secondaryText = `${note.body.substring(0, 20)}${note.body.length > 20 ? '...' : ''}`

        return (
            <ListItemButton onClick={() => handleClickResult(note._id)}>
                <CustomListText primary={primaryText} secondary={secondaryText} />
            </ListItemButton>
        )
    })

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Stack position='relative'>
                <SearchContainer sx={{ border: theme => open ? `1px solid ${theme.palette.primary.dark}` : 'none' }}>
                    <Collapse in={open} orientation='horizontal' unmountOnExit>
                        <CustomInputBase
                            value={title}
                            onChange={handleChange}
                            placeholder="Search note"
                            inputRef={inputRef}
                        />
                    </Collapse>
                    <SearchIconWrapper onClick={handleOpen} title='Find note'>
                        <SearchIcon color='primary' />
                    </SearchIconWrapper>
                </SearchContainer>
                {(queryResult && open) && (
                    <Stack sx={{ position: 'absolute', left: 0, top: '100%', zIndex: 1 }}>
                        <List component={Paper} dense>
                            {queryResult && renderResult}
                        </List>
                    </Stack>
                )}
            </Stack>
        </ClickAwayListener>
    )
}

export default HeaderSearchBtn