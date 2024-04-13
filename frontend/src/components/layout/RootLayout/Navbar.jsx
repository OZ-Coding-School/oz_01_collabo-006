import React from 'react'
import './RootLayout.css'
import navLogo from '/images/nav_logo.png'
import useLoginStore from '../../../store/login'
import { Link } from 'react-router-dom'
import Weather from './Weather'

export const _Navbar = () => {
    const { isLogined, setIsLogined } = useLoginStore((state) => state)

    const handleLogoutUser = () => {
        setIsLogined(false)
        localStorage.removeItem('key')
    }

    const handleLoginModal = () => {
        alert('로그인 모달창 오픈, 임시로 로그인 했다고 치겠다. ')
        setIsLogined(true)
        localStorage.setItem('key', 'token')
    }

    // const onLoginSubmit = async (e) => {
    //     e.preventDefault()
    //     const frm = new FormData()
    //     frm.append('username', loginUser.username)
    //     frm.append('password', loginUser.password)
    //     const response = await axios.post('http://localhost:8080/login', frm)
    //     let token = response.headers['authorization']
    //     token = token.split(' ')[1]
    //     localStorage.setItem('key', token)
    //     const getToken = localStorage.getItem('key')
    //     setIsLogined(true)
    // }

    return (
        <nav className="gnb">
            <div className="gnb_left">
                <div className="logo">
                    <Link to={'/'}>
                        <img src={navLogo} alt="" />
                    </Link>
                </div>
                <div className="weather">
                    <Weather />
                </div>
            </div>

            <div className="btn_login">
                {isLogined === false ? (
                    <button onClick={handleLoginModal}>로그인</button>
                ) : (
                    <button onClick={handleLogoutUser}>로그아웃</button>
                )}
            </div>
        </nav>
    )
}
