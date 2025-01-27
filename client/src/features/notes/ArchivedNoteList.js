import { store } from "../../app/store"
import useAuth from "../../hooks/useAuth"
import { noteApiSlice, useGetUserArchivedNotesQuery } from "./notesApiSlice"
import { useLocation } from 'react-router-dom'
import NoteCard from './NoteCard'
import { useCallback, useState } from "react"
import { Box } from "@mui/material"

const ArchivedNoteList = () => {
  const { id } = useAuth()
  const location = useLocation()
  const { from } = location.state || {}
  const [feedback, setFeedbackState] = useState('')

  const setFeedback = useCallback((message) => {
    setFeedbackState(message)
  }, [])

  if (from !== undefined) {
    store.dispatch(noteApiSlice.util.prefetch('getUserArchivedNotes', id, { force: true }))
  }

  const { notes, isLoadingNoteList, isSuccessNoteList } = useGetUserArchivedNotesQuery(id, {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      notes: data,
      isLoadingNoteList: isLoading,
      isSuccessNoteList: isSuccess
    })
  })

  let content

  if (isLoadingNoteList) {
    content = <p>Loading...</p>
  } else if (isSuccessNoteList) {

    const renderNotes = notes?.ids.map(id => <NoteCard note={notes.entities[id]} key={id} userId={id} setFeedback={setFeedback} />)

    content = (
      <Box>
        <Box sx={{ columnCount: { xs: 1, sm: 2, md: 3, lg: 4 }, mb: 1 }}>
          {renderNotes}
        </Box>
      </Box>
    )
  } else {
    content = <p>error</p>
  }

  return content

}

export default ArchivedNoteList
