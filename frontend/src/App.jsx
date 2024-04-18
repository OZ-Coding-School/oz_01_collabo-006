
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Container } from '@mui/material'

import _RootLayout from './components/layout/RootLayout'
import DetailPage from './pages/DetailPage'
import ErrorPage from './pages/ErrorPage'
import MainPage from './pages/MainPage'

const theme = createTheme({
    palette: {
        common: {
            customWhite: '#ffffff',
            customYellow: '#ffc145',
            customRed: '#ff6b6c',
            customPurple: '#b8b8d1',
            customBlack: '#48495c',
            customGray: '#a7a7a7',
        },
    },
})

const router = createBrowserRouter([
    {
        path: '/',
        element: <_RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <MainPage /> },
            { path: 'detail/:id', element: <DetailPage /> },
        ],
    },
])

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="md"
                sx={{
                    fontSize: {
                        xs: theme.spacing(1.5), // 모바일
                        md: theme.spacing(1.7), // 태블릿
                        lg: theme.spacing(2), // 데스크톱
                    },
                }}
            >
                <RouterProvider router={router} />
            </Container>
        </ThemeProvider>
    )
}

export default App

