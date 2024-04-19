import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'

function LoginFrom({ isLogin }) {
    function naverHandler(e) {
        e.preventDefault()
        alert('hi')
    }

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    return (
        <Box component="form" method="post" autoComplete="off" sx={{ mt: 7 }}>
            <Typography
                variant="h4"
                gutterBottom
                // sx={{ textAlign: 'center' }}
            >
                로그인
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 2,
                    mb: 2,
                }}
            >
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="이메일"
                    name="email"
                    variant="outlined"
                    type="email"
                />
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="비밀번호"
                />
                <Button
                    variant="contained"
                    disableElevation
                    type="submit"
                    size="large"
                    style={{
                        backgroundColor: '#ffc145',
                        height: '50px',
                    }}
                >
                    로그인
                </Button>
                <Box component="div">
                    <Button sx={{ p: 0 }} onClick={naverHandler}>
                        <img src="/images/btnG_완성형.png" alt="" />
                    </Button>
                </Box>
            </Box>

            <div>
                <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                    <Typography
                        variant="span"
                        gutterBottom
                        sx={{ float: 'right' }}
                    >
                        회원이 아니신가요?
                    </Typography>
                </Link>
            </div>
        </Box>
    )
}

export default LoginFrom
