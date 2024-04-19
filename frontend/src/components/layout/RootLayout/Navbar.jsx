import { Link } from 'react-router-dom'
import useLoginStore from '@/store/login'
import Weather from './Weather'
import navLogo from '/images/nav_logo.png'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { Button, Container } from '@mui/material'
import { green } from '@mui/material/colors'

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
        <Container maxWidth="md" style={{ padding: 0 }}>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                }}
            >
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Link to={'/'}>
                        <img src={navLogo} alt="" />
                    </Link>
                    <Typography
                        color={'black'}
                        variant="h8"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Weather />
                    </Typography>
                </Box>
                <Box>
                    {isLogined === false ? (
                        <Link to="/auth?mode=login">
                            <Button
                                style={{
                                    backgroundColor: '#ffc145',
                                    borderRadius: '16px',
                                }}
                                disableElevation
                                variant="contained"
                                size="medium"
                                // onClick={handleLoginModal}
                            >
                                로그인
                            </Button>
                        </Link>
                    ) : (
                        <Box
                            component="section"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src="images/nav_logo.png"
                                sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: green[500],
                                }}
                            />
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
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    )
}
