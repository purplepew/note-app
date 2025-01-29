import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import { useRefreshMutation } from "./authApiSlice"
import { Outlet, Link } from "react-router-dom"
import { Typography } from "@mui/material"


const PersistLogin = () => {
    const token = useSelector(selectCurrentToken)

    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh,
        { isSuccess, isUninitialized, isLoading }] = useRefreshMutation()


    useEffect(() => {
        if (effectRan.current) {
            const verifyRefreshToken = async () => {
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (error) {
                    console.log(error)
                }
            }
            if (!token) verifyRefreshToken()
        }
        return () => effectRan.current = true
    }, [refresh, token])

    let content

    if (isUninitialized && token) content = <Outlet />

    else if (isLoading) content = <p>Loading...</p>

    else if (isSuccess && trueSuccess) content = <Outlet />

    else content = (
        <Link to='/'>
            <Typography>Please login</Typography>
        </Link>
    )

    return content
}

export default PersistLogin