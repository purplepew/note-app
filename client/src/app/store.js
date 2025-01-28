import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import authReducer from '../features/auth/authSlice.js'
import noteListStateReducer from '../features/notes/NoteListSlice.js'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        noteListState: noteListStateReducer
    },
    middleware: defaultMiddleware => defaultMiddleware().concat(apiSlice.middleware)
})
