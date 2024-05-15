import React, { useState, useContext } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import { UserContext } from "../Components/UserContext";
import {useNavigate} from "react-router-dom";
import "./Signup.css";

const roles = ['PL', 'dev', 'tester']; // 역할, admin으로 가입할 수 없음


// 회원가입 함수
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const { addUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser({ email, password, role }); // 계정 추가 UserAccount에 저장됨
        alert("회원가입이 완료되었습니다.");
        window.location.reload(); // 메인 페이지로 이동
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="아이디"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>역할 *</InputLabel>
                    <Select
                        label="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Sign Up
                </Button>
            </form>
        </Box>
    );
}

export default Signup;