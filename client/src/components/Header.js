import { useLogoutMutation } from "../features/auth/authApiSlice"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"


const Header = () => {
    const token = useSelector(selectCurrentToken)

    const [logout, { isLoading }] = useLogoutMutation()
    const handleLogout = () => logout()
    const LogoutButton = () => token && (
        <Stack ml='auto'>
            <Button variant='contained' onClick={handleLogout} disabled={isLoading}>Logout</Button>
        </Stack>
    )

    return (
        <AppBar position="static" component={Paper} sx={{ backgroundColor: 'background.paper', minWidth: 300}}>
            <Toolbar >
                <Stack>
                    <Typography color='primary'>NotesDB</Typography>
                </Stack>
                <LogoutButton />
            </Toolbar>
        </AppBar>
    )
}

export default Header