import { useLogoutMutation } from "../features/auth/authApiSlice"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import ArchiveIcon from '@mui/icons-material/Archive'
import { IconButton } from "@mui/material"
import { noteApiSlice } from "../features/notes/notesApiSlice"
import useAuth from '../hooks/useAuth'
import { store } from '../app/store'
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'




const Header = () => {
    const token = useSelector(selectCurrentToken)
    const { id } = useAuth()
    const [isCalled, setIsCalled] = useState(false)
    const navigate = useNavigate()
  

    const [logout, { isLoading }] = useLogoutMutation()

    const handleLogout = () => logout()

    const prefetchArchivedNotes = async (e) => {
        if (!isCalled) {
            try {
                console.log('fetching')
                store.dispatch(noteApiSlice.util.prefetch('getUserArchivedNotes', id, { force: true }))
                setIsCalled(true)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const GotoArchivedList = () => {
        navigate('/public/archive', { state: {from: 'public'}})
    }

    const NavButtons = () => token && (
        <Stack ml='auto' direction="row">
            <IconButton color='primary' onMouseOver={prefetchArchivedNotes} onClick={GotoArchivedList}>
                <ArchiveIcon />
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