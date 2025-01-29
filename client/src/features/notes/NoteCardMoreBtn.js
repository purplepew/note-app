import React from 'react'
import { CustomIconButton } from './NoteList'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const NoteCardMoreBtn = ({setFeedback, note, colorTheme}) => {
    return (
        <CustomIconButton Icon={<MoreVertIcon fontSize='small' />} color={colorTheme.dark} title="More" />
    )
}

export default NoteCardMoreBtn