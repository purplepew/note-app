import React from 'react'
import { useGetUserNotesQuery } from './notesApiSlice'
import { Box, IconButton, Stack, styled, Typography } from '@mui/material'
import NoteCard from './NoteCard'

export const Container = styled(Box)(({ theme }) => ({
    minHeight: 150,
    maxHeight: 300,
    minWidth: 200,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    breakInside: 'avoid',
}))

export const InputWrapper = styled(Stack)(({ theme }) => ({
    color: theme.palette.primary.main,
    padding: '10px',
    cursor: 'pointer',
    overflowY: 'hidden'
}))

export const CustomIconButton = ({ Icon, ml, func, color='primary.dark' }) => {
    return (
        <IconButton size='small' sx={{ ml, color }} onClick={func}>
            {Icon}
        </IconButton>
    )
}

const NoteList = ({ setFeedback, userId }) => {

    const { notes, isLoadingNoteList, isSuccessNoteList } = useGetUserNotesQuery(userId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            notes: data,
            isLoadingNoteList: isLoading,
            isSuccessNoteList: isSuccess
        })
    })

    if (isLoadingNoteList) {
        return <p>Loading...</p>
    } else if (isSuccessNoteList) {

        const { ids, entities } = notes

        const pinnedNotesIds = ids.filter(id => entities[id].pinned === true)
        const regularNotesIds = ids.filter(id => !pinnedNotesIds.includes(id) && entities[id].archived === false)

        const renderPinnedNotes = pinnedNotesIds.map(noteId => <NoteCard note={entities[noteId]} key={noteId} userId={userId} setFeedback={setFeedback} />)
        const renderRegularNotes = regularNotesIds.map(noteId => <NoteCard note={entities[noteId]} key={noteId} userId={userId} setFeedback={setFeedback} />)

        return (
            <Box>
                <Box sx={{ columnCount: {xs: 1, sm: 2, md: 3, lg: 4}, mb: 1}}>
                    {renderPinnedNotes}
                </Box>
                <Box sx={{ columnCount: {xs: 1, sm: 2, md: 3, lg: 4}, }}>
                    {renderRegularNotes}
                </Box>
            </Box>
        )

    } else {
        return <p>Error</p>
    }


}

export default NoteList