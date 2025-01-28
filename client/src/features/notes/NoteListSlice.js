import { createSlice } from "@reduxjs/toolkit";

const noteListSlice = createSlice({
    name: 'noteListState',
    initialState: {showArchivedNotes: false},
    reducers: {
        revealArchivedNotes: (state, action) => {
            state.showArchivedNotes = true
        },
        hideArchivedNotes: (state, action) => {
            state.showArchivedNotes = false
        }
    }
})

export default noteListSlice.reducer

export const {revealArchivedNotes, hideArchivedNotes} = noteListSlice.actions

export const selectCurrentNoteListState = (state) => state.noteListState.showArchivedNotes