import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'
import instance from '../../api/axios'

function SignupForm({ isLogin }) {
    const [dogs_size, setDge] = useState('')
    const handleChange = (event) => {
        setDge(event.target.value)
    }
    const [email, setEmail] = useState('')
    const [last_name, setLast_name] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPassword2] = useState('')

    function isValidEmail(email) {
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    function isSame(password, password_confirm) {
        if (password === password_confirm) {
            return true
        } else {
            return false
        }
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await instance.post(
                '/users/signup/',
                { email, password, dogs_size, last_name, password_confirm },
                {
                    headers: {
                        accept: 'application/json',
                    },
                }
            )
            console.log(response.data)
            navigate(-1)
        } catch (error) {
            console.error('회원가입 실패:', error)
        }
        // redirect("/")
    }
    return (
        <Box sx={{ mt: 7 }}>
            <Typography
                variant="h4"
                gutterBottom
                // sx={{ textAlign: 'center' }}
            >
                회원가입
            </Typography>
            <form method="post">
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
                        label="닉네임"
                        name="_name"
                        variant="outlined"
                        type="text"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                    />
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
                    {!isValidEmail(email) && email.length ? (
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
                    ) : null}
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="비밀번호"
                        name="password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {password.length < 8 && password.length ? (
                        <p
                            style={{
                                fontSize: '12px',
                                color: 'red',
                                marginLeft: '5px',
                                marginBottom: '10px',
                                marginTop: '-10px',
                            }}
                        >
                            8자리 이상 입력해주세요.
                        </p>
                    ) : null}
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="비밀번호 확인"
                        name="password2"
                        variant="outlined"
                        type="password"
                        value={password_confirm}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    {!isSame(password, password_confirm) &&
                    password_confirm.length ? (
                        <p
                            style={{
                                fontSize: '12px',
                                color: 'red',
                                marginLeft: '5px',
                                marginBottom: '10px',
                                marginTop: '-10px',
                            }}
                        >
                            비밀번호가 일치하지 않습니다.
                        </p>
                    ) : null}

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            멍돌이 사이즈
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dogs_size}
                            label="멍돌이 사이즈"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>소형견</MenuItem>
                            <MenuItem value={2}>중형견</MenuItem>
                            <MenuItem value={3}>대형견</MenuItem>
                            <MenuItem value={4}>맹견</MenuItem>
                        </Select>
                    </FormControl>
                    {isValidEmail(email) &&
                    isSame(password, password_confirm) &&
                    last_name &&
                    dogs_size ? (
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
                            가입
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
                            가입
                        </Button>
                    )}
                </Box>
            </form>
            <div>
                <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                    <Typography
                        variant="span"
                        gutterBottom
                        sx={{ float: 'right' }}
                    >
                        이미 회원이신가요?
                    </Typography>
                </Link>
            </div>
        </Box>
    )
}
export default SignupForm
