import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setCredential } from "./authSlice"
import { useNavigate, Link } from "react-router-dom"
import { useSignupMutation } from "./authApiSlice"

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const inputChange = (setter) => e => setter(e.target.value)

    const [signup, { isLoading }] = useSignupMutation()

    const handleSignup = async () => {
        if (!username || !password) return
        try {
            const { accessToken } = await signup({ username, password }).unwrap()
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
            <Typography>Sign up</Typography>

            <Divider />

            <TextField variant='filled' label='Username' onChange={inputChange(setUsername)} />

            <TextField variant='filled' label='Password' type="password" onChange={inputChange(setPassword)} />

            {errMsg && <Typography color='primary.main'>{errMsg}</Typography>}

            <Button variant='outlined' onClick={handleSignup} disabled={isLoading}>Create account</Button>

            <Typography variant="body2" sx={{ color: 'primary.main' }}>
                Already have an account? <Link to="/">Log in</Link>
            </Typography>
        </Stack>
    )
}

export default Signup