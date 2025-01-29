import { Box, ClickAwayListener, Collapse, IconButton, InputBase, styled } from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

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

const HeaderSearchBtn = () => {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')

    const handleChange = useCallback((e)=>setTitle(e.target.value), [])

    const inputRef = useRef()

    const handleOpen = useCallback(() => {
        setOpen(true)
        setTimeout(()=>inputRef.current.focus(), 50)
    }, [inputRef])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])


    return (
        <ClickAwayListener onClickAway={handleClose}>
            <SearchContainer sx={{ border: theme => open ? `1px solid ${theme.palette.primary.dark}` : 'none' }}>
                <Collapse in={open} orientation='horizontal'>
                    <CustomInputBase value={title} onChange={handleChange} placeholder="Search note" inputRef={inputRef} />
                </Collapse>
                <SearchIconWrapper onClick={handleOpen}>
                    <SearchIcon color='primary' />
                </SearchIconWrapper>
            </SearchContainer>
        </ClickAwayListener>
    )
}

export default HeaderSearchBtn