import { Stack, Typography } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Container, InputWrapper, CustomIconButton } from './NoteList'
import EditNote from './EditNote'
import { paletteTheme } from './NoteList'
import NoteCardBgColorPalette from './NoteCardBgColorPalette'
import NoteCardArchiveBtn from './NoteCardArchiveBtn'
import NoteCardPinBtn from './NoteCardPinBtn'
import NoteCardDeleteBtn from './NoteCardDeleteBtn'
import NoteCardMoreBtn from './NoteCardMoreBtn'


const NoteCard = ({ note, setFeedback }) => {
    const [editMode, setEditMode] = useState({ open: false, initialFocus: null })

    const colorTheme = paletteTheme[note.colorTheme || 0]

    const handleOpenEditMode = useCallback((initialFocus) => setEditMode({ open: true, initialFocus }), [setEditMode])
    const handleCloseEditMode = useCallback(() => setEditMode({ open: false, initialFocus: null }), [setEditMode])

    let content = (
        <Container sx={{ backgroundColor: colorTheme.bgColor ?? null }}>
            <Stack direction='row'>
                <InputWrapper onClick={() => handleOpenEditMode('title')}>
                    <Typography color={note.title ? colorTheme.color : colorTheme.dark}>
                        {note.title || 'Title'}
                    </Typography>
                </InputWrapper>

                <NoteCardPinBtn setFeedback={setFeedback} note={note} colorTheme={colorTheme} />
            </Stack>

            <InputWrapper height='100%' onClick={() => handleOpenEditMode('body')}>
                <Typography color={note.body ? colorTheme.color : colorTheme.dark} variant='body2' sx={{ whiteSpace: 'pre-line' }}>
                    {note.body || 'Body'}
                </Typography>
            </InputWrapper>

            <Stack direction='row' mt='auto'>
                <CustomIconButton Icon={<NotificationsIcon fontSize='small' />} color={colorTheme.dark} />
                <CustomIconButton Icon={<GroupAddIcon fontSize='small' />} color={colorTheme.dark} />
                <NoteCardBgColorPalette setFeedback={setFeedback} note={note} colorTheme={colorTheme}/>
                <NoteCardMoreBtn setFeedback={setFeedback} note={note} colorTheme={colorTheme}/>
                <NoteCardArchiveBtn setFeedback={setFeedback} note={note} colorTheme={colorTheme}/>
                <NoteCardDeleteBtn setFeedback={setFeedback} note={note} colorTheme={colorTheme}/>
            </Stack>

        </Container >
    )

    if (editMode.open) {
        return <EditNote
            handleCloseEditMode={handleCloseEditMode}
            note={note}
            initialFocus={editMode.initialFocus}
            setFeedback={setFeedback}
        />
    }

    return content
}

const memoized = memo(NoteCard)

export default memoized