import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        const { username, role, id } = decoded.UserInfo

        return { username, role, id}
    }
    return { username: '', role: '', id: ''}
}

export default useAuth