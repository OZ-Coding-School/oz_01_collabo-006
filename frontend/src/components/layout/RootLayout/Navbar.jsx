import useLoginStore from '@/store/login'
import { Button, Container } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link } from 'react-router-dom'
import navLogo from '../../../../public/images/nav_logo.png'
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
        <Box sx={{ flexGrow: 1 }}>
            <Container maxWidth="md" style={{ padding: 0 }}>
                <AppBar
                    position="static"
                    style={{
                        backgroundColor: 'white',
                        boxShadow: 'none',
                    }}
                >
                    <Toolbar>
                        <Link to={'/'}>
                            <img src={navLogo} alt="" />
                        </Link>
                        <Typography
                            color={'black'}
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            <Weather />
                        </Typography>
                        <div>
                            {isLogined === false ? (
                                <Button
                                    style={{
                                        backgroundColor: '#ffc145',
                                        borderRadius: '16px',
                                    }}
                                    disableElevation
                                    variant="contained"
                                    size="medium"
                                    onClick={handleLoginModal}
                                >
                                    로그인
                                </Button>
                            ) : (
                                <Button
                                    style={{
                                        backgroundColor: '#ffc145',
                                        borderRadius: '50px',
                                    }}
                                    disableElevation
                                    variant="contained"
                                    size="medium"
                                    onClick={handleLogoutUser}
                                >
                                    로그아웃
                                </Button>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
            </Container>
        </Box>
    )
}
