import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import { useRef, useState } from "react"
import { useLoginMutation } from "./authApiSlice"
import { useDispatch } from "react-redux"
import { setCredential } from "./authSlice"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const inputChange = (setter) => e => setter(e.target.value)

    const [login, { isLoading }] = useLoginMutation()

    const handleLogin = async () => {
        if (!username || !password) return
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredential({ accessToken }))
            setErrMsg('')
            navigate('/public')
        } catch (error) {
            console.log(error)
            setErrMsg(error.data?.message || 'No server response')
        }
    }


    return (
        <Stack sx={{ width: 300 }} gap={1}>
            <Typography>Log in</Typography>

            <Divider />

            <TextField variant='filled' label='Username' onChange={inputChange(setUsername)} />

            <TextField variant='filled' label='Password' onChange={inputChange(setPassword)} />

            {errMsg && <Typography color='primary.main'>{errMsg}</Typography>}

            <Button variant='outlined' onClick={handleLogin} disabled={isLoading}>Login</Button>
        </Stack>
    )
}

export default Login