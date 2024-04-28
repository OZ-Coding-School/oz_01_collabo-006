import { Button, Container } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { green } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import navLogo from '/images/nav_logo.png'
import useLoginStore from '../../../store/login'


export const _Navbar = () => {
    const { isLogined, setIsLogined } = useLoginStore((state) => state)

    const handleLogoutUser = () => {
        setIsLogined(false)
        console.log(isLogined);
        localStorage.removeItem('login_state')

    }


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
                    <Toolbar style={{ padding: 0 }}>
                        <Link to={'/'}>
                            <img
                                src={navLogo}
                                alt=""
                                style={{ marginRight: '12px' }}
                            />
                        </Link>
                        <Typography
                            color={'black'}
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, cursor: 'default' }}
                        >
                            {/* <Weather /> */}
                        </Typography>
                        <Box>
                            {isLogined ? (
                              
                                    <Button
                                        style={{
                                            backgroundColor: '#ffc145',
                                            borderRadius: '16px',
                                        }}
                                        disableElevation
                                        variant="contained"
                                        size="medium"
                                        // onClick={handleLoginModal}
                                        onClick={handleLogoutUser}
                                    >
                                        로그아웃
                                    </Button>
                             
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
                                      <Link to="/auth?mode=login">
                                    <Button
                                        style={{
                                            backgroundColor: '#ffc145',
                                            borderRadius: '50px',
                                        }}
                                        disableElevation
                                        variant="contained"
                                        size="medium"
                                 
                                    >
                                        로그인
                                    </Button>
                                    </Link>
                                </Box>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Container>
        </Box>
    )
}
