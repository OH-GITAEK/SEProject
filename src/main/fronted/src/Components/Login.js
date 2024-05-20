import React, { useState, useContext } from 'react';
import {UserContext, UserProvider} from "./UserContext";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import Signup from "../page/Signup";
import {Button} from "@mui/material";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [userData, setUserData] = useState({ email: '', role: ''});
  const [isSignUp, setIsSignUp] = useState(false); // 로그인 상태
  const { users } = useContext(UserContext);// 저장된 계정 가져옴
  const navigate = useNavigate(); // 페이지이동

  const handleLogin = (event) => {
    event.preventDefault();
    // 로그인 판단
    const user = users.find((user) => user.email === event.target.memberEmail.value && user.password === event.target.memberPassword.value);
    if (user) {
      setIsLoggedIn(true);
      // 사용자 이메일 설정
      setUserData({ email: user.email, role: user.role});
    } else {
      alert('이메일 혹은 비밀번호가 틀렸습니다.');
      window.location.reload();
    }

  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ email: '', role: ''});
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setIsSignUp(true);
  }

  if (isLoggedIn) {
    return (
      <div className='login'>
        <h1>환영합니다, {userData.email}!</h1>
        <h2>역할: {userData.role}</h2>
        <button onClick={handleLogout} id='signout'>로그아웃</button>
      </div>
    );
  }

  if(isSignUp){
    return (
        <div className='login'>
          <UserProvider>
            <Signup/>
          </UserProvider>
        </div>
    );
  }

  return (
        <div className="login">
          <form id='loginform' onSubmit={handleLogin} method="post">
            아이디: <input type="text" name="memberEmail" required /><br/>
            비밀번호: <input type="password" name="memberPassword"/><br/>
            <input type="submit" value="로그인"/>
          </form>
          <Button onClick={handleSignUp} color="primary">
            회원가입
          </Button>
        </div>
  );
}

export default Login;