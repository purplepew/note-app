import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import React, { useCallback, useState } from 'react'
import { CustomIconButton } from './NoteList'
import SquareIcon from '@mui/icons-material/Square';
import PaletteIcon from '@mui/icons-material/Palette';
import { usePatchNoteMutation } from './notesApiSlice';

const NoteCardBgColorPalette = ({ setFeedback, note, colorTheme }) => {
    const [paletteAnchorEl, setPaletteAnchorEl] = useState(null)
    const isOpenPalette = Boolean(paletteAnchorEl)
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [patchNote] = usePatchNoteMutation()


    const handleOpenPalette = useCallback((e) => {
        setPaletteAnchorEl(e.currentTarget)
    }, [setPaletteAnchorEl])

    const handleClosePalette = useCallback(() => {
        setPaletteAnchorEl(null)
    }, [setPaletteAnchorEl])

    const handleChangeTheme = useCallback(async (themeNumber) => {
        try {
            await patchNote({ noteId: note.id, colorTheme: themeNumber }).unwrap()
            handleClosePalette()
            setTrueSuccess(true)

        } catch (error) {
            const message = 'Failed: ' + (error.data.message || 'Unknown error')
            setFeedback(message)
        }
    }, [patchNote, note.id, setFeedback, handleClosePalette])

    return (
        <>
            <Popover
                open={isOpenPalette}
                anchorEl={paletteAnchorEl}
                onClose={handleClosePalette}
                component={Box}
            >
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <CustomIconButton Icon={<SquareIcon />} color='#3f3f3e' func={() => handleChangeTheme(0)} />
                    <CustomIconButton Icon={<SquareIcon />} color='#A07414' func={() => handleChangeTheme(1)} />
                    <CustomIconButton Icon={<SquareIcon />} color='#76299F' func={() => handleChangeTheme(2)} />
                    <CustomIconButton Icon={<SquareIcon />} color='#969339' func={() => handleChangeTheme(3)} />
                </Box>
            </Popover>
            <CustomIconButton
                Icon={<PaletteIcon fontSize='small' />}
                func={handleOpenPalette}
                color={colorTheme.dark}
                title="Card Background Color"
            />
        </>
    )
}

export default NoteCardBgColorPalette