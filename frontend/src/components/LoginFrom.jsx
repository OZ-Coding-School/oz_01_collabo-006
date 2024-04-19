import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function LoginFrom({ isLogin }) {
    function naverHandler(e) {
        e.preventDefault()
        alert('hi')
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
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="비밀번호"
                    name="password"
                    variant="outlined"
                    type="password"
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
