import { useLogoutMutation } from "../features/auth/authApiSlice"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import ArchiveIcon from '@mui/icons-material/Archive'
import EventNoteIcon from '@mui/icons-material/EventNote'
import { IconButton } from "@mui/material"
import { noteApiSlice } from "../features/notes/notesApiSlice"
import useAuth from '../hooks/useAuth'
import { store } from '../app/store'
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { hideArchivedNotes, revealArchivedNotes, selectCurrentNoteListState } from "../features/notes/NoteListSlice"




const Header = () => {
    const token = useSelector(selectCurrentToken)

    const dispatch = useDispatch()
    const showArchivedNotes = useSelector(selectCurrentNoteListState)

    const [logout, { isLoading }] = useLogoutMutation()
    const handleLogout = () => logout()


    const toggleNoteListState = () => {
        if (showArchivedNotes) {
            dispatch(hideArchivedNotes())
        } else {
            dispatch(revealArchivedNotes())
        }
    }

    const NavButtons = () => token && (
        <Stack ml='auto' direction="row">
            <IconButton color='primary' onClick={toggleNoteListState} title={showArchivedNotes?'Go back to Notes':'Go to Archives'}>
                {
                    !showArchivedNotes ? <ArchiveIcon /> : <EventNoteIcon />
                }
            </IconButton>
            <Button variant='contained' onClick={handleLogout} disabled={isLoading}>Logout</Button>
        </Stack>
    )

    return (
        <AppBar position="static" component={Paper} sx={{ backgroundColor: 'background.paper', minWidth: 300 }}>
            <Toolbar >

                <Stack>
                    <Link to='/public'><Typography color='primary'>NotesDB</Typography></Link>
                </Stack>

                <NavButtons />

            </Toolbar>
        </AppBar>
    )
}

export default Header