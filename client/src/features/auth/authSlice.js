import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredential: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        removeCredential: (state, action) => {
            state.token = null
        }
    }
})

export default authSlice.reducer

export const { setCredential, removeCredential } = authSlice.actions

export const selectCurrentToken = state => state.auth.token