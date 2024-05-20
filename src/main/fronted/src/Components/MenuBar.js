import React, { useState } from 'react';
import Login from "./Login.js";
import { UserProvider } from "./UserContext";
import "./Menubar.css";

// 메뉴바 상태를 확인하고 반환하는 함수
function MenuBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // 화면이 커지면 다시 표시해야함
    };

    return (
        <div>
             {/* 메뉴 아이콘의 위치를 조건에 따라 변경 */}
             <div className={`bar-toggle ${isMenuOpen ? "next-to-sidebar" : "top-left"}`} onClick={toggleMenu}>
                <span>☰</span> {/* 메뉴 아이콘 */}
            </div>
        {isMenuOpen && (
                <div className="sidebar">
                    <div className="logo">Team5</div>
                    <UserProvider>
                                <Login/>
                    </UserProvider>
                    <div className="menu">
                        <a href="/">Home</a> {/*navigate로 변경예정*/}
                        <a href="#">Project</a> {/*할당된 프로젝트로 이동*/}
                        <a href="#">Issue</a> {/*배정된 프로젝트로 이동*/}
                        <a href="#">Analysis</a> {/*분석으로 이동*/}
                    </div>
                </div>
        )}
        </div>
    );
}

export default MenuBar;
