import React from 'react';


function MenuBar() {

    return (
        <div className="sidebar">
            <div className="logo">Team5</div>
            <div className="login">
                <form action="/member/login" method="post">
                    아이디: <input type="text" name="memberEmail"/> <br/>
                    비밀번호: <input type="password" name="memberPassword"/> <br/>
                    <input type="submit" value="로그인"/>
                    <a href="/member/save">회원가입</a>
                </form>
            </div>
            <div className="menu">
                <a href="/">Home</a>
                <a href="#">Issue</a>
                <a href="#">Analysis</a>
            </div>
        </div>
    );

}

export default MenuBar;
