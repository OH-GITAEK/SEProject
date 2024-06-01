import React, { useState } from 'react';
import { TextField, Button, Box, IconButton, InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff} from "@mui/icons-material";
import axios from "axios";

// 회원가입 함수
export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // db에 회원정보 보냄
    const addUser = (user) => {
        axios.post('/api/member/save',{
            memberEmail: user.email,
            memberPassword: user.password,
            memberName: user.name
            }
        )
            .then(function (response) {
                console.log(response);
                alert("회원가입이 완료되었습니다.");
            })
            .catch(function (error) {
                console.log(error);
                alert("회원가입이 실패했습니다.");
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser({ name, email, password }); // 계정추가
        window.location.reload(); // 메인 페이지로 이동
    };

    // 비밀번호 * 해제 함수
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, padding: '40px'}}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                    color="success"
                    margin="dense"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#03C75A', // 포커스 시 테두리 색상
                            },
                            '& .MuiInputLabel-root': {
                                color: '#03C75A', // 기본 레이블 색상
                            },
                        },
                    }}
                />
                <TextField
                    label="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    color="success"
                    margin="dense"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#03C75A', // 포커스 시 테두리 색상
                            },
                            '& .MuiInputLabel-root': {
                                color: '#03C75A', // 기본 레이블 색상
                            },
                        },
                    }}
                />
                <TextField
                    label="비밀번호"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    color="success"
                    margin="dense"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#03C75A', // 포커스 시 테두리 색상
                            },
                            '& .MuiInputLabel-root': {
                                color: '#03C75A', // 기본 레이블 색상
                            },
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type="submit" variant="contained" fullWidth margin='normal' sx={{
                    backgroundColor: '#03C75A', // 네이버 초록색
                    '&:hover': {
                        backgroundColor: '#03C75A', // 네이버 초록색 호버
                    },
                }}>
                    가입
                </Button>
            </form>
        </Box>
    );
}