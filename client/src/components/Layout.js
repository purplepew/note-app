import { Outlet } from 'react-router-dom'
import Container from '@mui/material/Container'
import Header from './Header'

const Layout = () => {
    return (
        <Container sx={{minHeight: '100vh', backgroundColor: 'secondary.main'}}>
            <Header />
            <Outlet />
        </Container>
    )
}

export default Layout