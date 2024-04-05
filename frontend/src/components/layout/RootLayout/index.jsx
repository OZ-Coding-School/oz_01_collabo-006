import { Outlet } from 'react-router-dom'
import { _Navbar } from './Navbar'

function _RootLayout() {
    return (
        <>
            <_Navbar />
            <Outlet />
        </>
    )
}

export default _RootLayout
