import { store } from "../../app/store"
import { useEffect } from "react"
import { noteApiSlice } from "../notes/notesApiSlice"
import { Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const Prefetch = () => {
    const { id } = useAuth()

    useEffect(() => {
        if(id){
            store.dispatch(noteApiSlice.util.prefetch('getUserNotes', id, { force: true }))
        }
    }, [id])

    return <Outlet />
}

export default Prefetch