import React, { useState } from 'react';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: '' });

  const handleLogin = (event) => {
    event.preventDefault();
    // 로그인 로직 구현, 여기서는 예시로 항상 로그인 성공으로 가정
    // db의 id pwd와 비슷한지 확인
    setIsLoggedIn(true);
    // 사용자 이메일 설정
    setUserData({ email: event.target.memberEmail.value });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ email: '' });
  };

  if (isLoggedIn) {
    return (
      <div className='login'>
        <h1>환영합니다, {userData.email}!</h1>
        <button onClick={handleLogout} id='signout'>로그아웃</button>
      </div>
    );
  }

  return (
    <div className="login">
      <form id='loginform' onSubmit={handleLogin} method="post">
        아이디: <input type="text" name="memberEmail" required /><br/>
        비밀번호: <input type="password" name="memberPassword"/><br/>
        <input type="submit" value="로그인"/>
        <a id='signup' href="/member/save">회원가입</a>
      </form>
    </div>
  );
}

export default Login;