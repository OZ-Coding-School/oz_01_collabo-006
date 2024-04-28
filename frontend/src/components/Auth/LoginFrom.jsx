import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';

function LoginFrom({ isLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNaverLogin = () => {
        window.location.href = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=8aEOJLOZ8gGmnkpScnOS&redirect_uri=http://localhost:5173/auth?mode=login';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://175.45.192.12/api/v1/users/login/',
                { email, password }
            );
            document.cookie = `access=${response.data.access};`;
            document.cookie = `refresh=${response.data.refresh};`;
            console.log('로그인 됨');
            // 로그인 성공 후 처리
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('아이디와 비밀번호를 다시 확인해주세요.');
        }
    };

    return (
        <Box sx={{ mt: 7 }}>
            <Typography variant="h4" gutterBottom>
                로그인
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, mb: 2 }}>
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
                <Button
                    variant="contained"
                    disableElevation
                    type="submit"
                    size="large"
                    style={{ backgroundColor: '#FFC145', height: '50px' }}
                    onClick={handleSubmit}
                >
                    로그인
                </Button>
                <Button
                    sx={{ p: 0 }}
                    onClick={handleNaverLogin}
                >
                    <img
                        src="/images/btnG_완성형.png" // 네이버 소셜 로그인 버튼 이미지 경로
                        alt="네이버 로그인"
                        style={{ width: '200px' }}
                    />
                </Button>
            </Box>
            <div>
                <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                    <Typography variant="span" gutterBottom sx={{ float: 'right' }}>
                        회원이 아니신가요?
                    </Typography>
                </Link>
            </div>
        </Box>
    );
}
;

export default LoginFrom;