import { Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import theme from './theme'

import _RootLayout from './components/layout/RootLayout'
import AuthPage from './pages/AuthPage'
import DetailPage from './pages/DetailPage'
import ErrorPage from './pages/ErrorPage'
import MainPage from './pages/MainPage'
import MyPage from './pages/MyPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <_RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <MainPage /> },
            { path: 'detail/:id', element: <DetailPage /> },
            { path: 'my', element: <MyPage /> },
            { path: 'auth', element: <AuthPage /> },
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
