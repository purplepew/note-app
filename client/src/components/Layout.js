import { Outlet } from 'react-router-dom'
import Container from '@mui/material/Container'
import Header from './Header'

const Layout = () => {
    return (
        <Container sx={{minHeight: '100vh', backgroundColor: 'secondary.main'}}>
            <p style={{color: 'hotpink'}}>ANNOUNCEMENT. just wanna say hi :D :D</p>
            <Header />
            <Outlet />
        </Container>
    )
}

export default Layout