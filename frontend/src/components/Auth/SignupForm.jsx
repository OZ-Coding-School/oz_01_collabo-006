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
import axios from 'axios'
function SignupForm({ isLogin }) {
    const [dog, setDge] = useState('')
    const handleChange = (event) => {
        setDge(event.target.value)
    }
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPassword2] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://175.45.192.12/api/v1/users/signup/',
                { email, password, dog, name, password_confirm },
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            멍돌이 사이즈
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dog}
                            label="멍돌이 사이즈"
                            onChange={handleChange}
                            name="dogSize"
                        >
                            <MenuItem value={1}>소형견</MenuItem>
                            <MenuItem value={2}>중형견</MenuItem>
                            <MenuItem value={3}>대형견</MenuItem>
                            <MenuItem value={4}>맹견</MenuItem>
                        </Select>
                    </FormControl>
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
