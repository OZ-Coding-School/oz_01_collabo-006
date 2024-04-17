import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import _RootLayout from './components/layout/RootLayout'
import DetailPage from './pages/DetailPage'
import ErrorPage from './pages/ErrorPage'
import MainPage from './pages/MainPage'

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
    return <RouterProvider router={router} />
}

export default App
