import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import './index.css'

import { createTheme, ThemeProvider } from '@mui/material'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'

const theme = createTheme({
    palette: {
        primary: {
            main: '#82E856',
            dark: '#41752B',
        },
        secondary: {
            main: '#5F695B',
            light: '#AFC0A7',
        },
        background: {
            paper: '#2f2f2f'
        },
        text: {
            primary: '#000'
        }
    },
   
})


const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
)