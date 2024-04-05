import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import _RootLayout from './components/layout/RootLayout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <_RootLayout />,
        children: [
            { path: '/', element: <MainPage /> },
            { path: '/detail', element: <DetailPage /> },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
