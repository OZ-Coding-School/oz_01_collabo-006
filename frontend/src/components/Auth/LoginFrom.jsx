import { Link, useNavigate } from 'react-router-dom'
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
import FormControl from '@mui/material/FormControl'
import axios from 'axios'
import useLoginStore from '../../store/login'
function LoginFrom({ isLogin }) {
    const setIsLogined = useLoginStore((state) => state.setIsLogined)
    const isLogined = useLoginStore((state) => state.isLogined)
    function naverHandler(e) {
        e.preventDefault()
        alert('hi')
    }
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://223.130.153.84/api/v1/users/login/',
                { email, password }
            )
            document.cookie = `access=${response.data.access};`
            document.cookie = `refresh=${response.data.refresh};`
            console.log('로그인 됨')
            setIsLogined(true)
            navigate(-1)
        } catch (error) {
            console.error('로그인 실패:', error)
            alert('아이디와 비밀번호를 다시 확인해주세요.')
        }
    }

    function isValidEmail(email) {
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    return (
        <Box sx={{ mt: 7 }}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {isValidEmail(email) ? null : (
                    <p
                        style={{
                            fontSize: '12px',
                            color: 'red',
                            marginLeft: '5px',
                            marginBottom: '10px',
                            marginTop: '-10px',
                        }}
                    >
                        이메일 형식이 아닙니다.
                    </p>
                )}
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        비밀번호
                    </InputLabel>
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
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Box></Box>
                {isValidEmail(email) && password ? (
                    <Button
                        variant="contained"
                        disableElevation
                        type="submit"
                        size="large"
                        style={{
                            backgroundColor: '#FFC145',
                            height: '50px',
                        }}
                        onClick={handleSubmit}
                    >
                        로그인
                    </Button>
                ) : (
                    <Button
                        disabled
                        variant="contained"
                        disableElevation
                        type="submit"
                        size="large"
                        style={{
                            backgroundColor: '#a7a7a7',
                            height: '50px',
                        }}
                        onClick={handleSubmit}
                    >
                        로그인
                    </Button>
                )}
                <Button sx={{ p: 0 }} onClick={naverHandler}>
                    <img
                        src="/images/btnG_완성형.png"
                        alt=""
                        style={{
                            width: '200px',
                        }}
                    />
                </Button>
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
