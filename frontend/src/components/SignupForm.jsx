import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import OutlinedInput from '@mui/material/OutlinedInput'

function SignupForm({ isLogin }) {
    const [dog, setDge] = useState('')

    const handleChange = (event) => {
        setDge(event.target.value)
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
                회원가입
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
                    label="닉네임"
                    name="email"
                    variant="outlined"
                    type="text"
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="이메일"
                    name="email"
                    variant="outlined"
                    type="email"
                />
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
                    />
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        비밀번호 확인
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
                        label="비밀번호 확인"
                    />
                </FormControl>
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
                        backgroundColor: '#ffc145',
                        height: '50px',
                    }}
                >
                    가입
                </Button>
            </Box>

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
