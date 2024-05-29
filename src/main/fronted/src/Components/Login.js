import React, { useState, useContext } from 'react';
import Signup from "./Signup";
import {Box, Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import { UserContext } from './Usercontext'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    
  const { userData, setUserData, isLoggedIn, setIsLoggedIn } = useContext(UserContext); // UserContext로부터 변수 상속
  const [isSignUp, setIsSignUp] = useState(false); // 회원가입 버튼 눌렀는지
  const [showPassword, setShowPassword] = useState(false); // 비번 표시
  const navigate = useNavigate();
  
  /* 로그인 로직 */
  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('/api/member/login', {
        memberEmail: event.target.memberEmail.value,
        memberPassword: event.target.memberPassword.value,
    })
        .then((response) => {
            if(response.data.memberEmail === event.target.memberEmail.value && response.data.memberPassword === event.target.memberPassword.value){
                setUserData({memberEmail: response.data.memberEmail,
                    memberName: response.data.memberName
                });
                sessionStorage.setItem("userData", JSON.stringify(response.data));
                setIsLoggedIn(true);
                navigate(`/Project`);
            }
            else {
                alert('이메일 혹은 비밀번호가 틀렸습니다.');
                navigate(``);
            }
        })
        .catch(function (error) {
            console.log(error);
            alert('인터넷 연결상태를 확인하세요.');
            navigate(``);
        });
  };

    /* 로그아웃 로직 */
    const handleLogout = () => {
        axios.post('/api/member/logout')
            .then((response) => {
                setIsLoggedIn(false);
                // 세션 스토리지에서 정리
                sessionStorage.removeItem('userData');
                sessionStorage.removeItem('currentProjectId');
                sessionStorage.removeItem('currentIssueId');
                setUserData({});
                navigate(``);
            })
            .catch(function (error) {
                console.log(error);
                alert('인터넷 연결상태를 확인하세요.');
                navigate(``);
            });
    };


  // 로그인하면 유저 정보 표시
    if (isLoggedIn) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, padding: '40px', textAlign: 'center'}}>
                <h1>환영합니다!<br/>{userData.memberName}</h1>
                <Button onClick={handleLogout} variant="contained" sx={{
                    backgroundColor: '#03C75A', // 네이버 초록색
                    '&:hover': {
                        backgroundColor: '#03C75A', // 네이버 초록색 호버
                    },
                }}>
                    로그아웃
                </Button>
            </Box>
        );
    }

  /* 회원가입 로직 */
  const handleSignUp = (event) => {
    event.preventDefault();
    setIsSignUp(true);
  }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

  if(isSignUp){
    return (<Signup/>);
  }


  /*페이지 구성*/
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, padding: '40px'}}>
          <form id='loginform' onSubmit={handleLogin} method="post">
              <TextField
                  label="이메일"
                  name="memberEmail"
                  fullWidth
                  margin="none"
                  color="success"
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
                  name="memberPassword"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  margin = 'normal'
                  color="success"
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
              <Button type="submit" variant="contained" fullWidth margin="normal" sx={{
                  backgroundColor: '#03C75A', // 네이버 초록색
                  '&:hover': {
                      backgroundColor: '#03C75A', // 네이버 초록색 호버
                  },
              }}>
                  로그인
              </Button>
          </form>
          <Button onClick={handleSignUp} color="primary">
            회원가입
          </Button>
        </Box>
  );
}