import React, { useState } from 'react';
import Login from "./Login.js";

// 메뉴바 상태를 확인하고 반환하는 함수
function MenuBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                    <Login/>
                    <div className="menu">
                        <a href="/">Home</a>
                        <a href="#">Issue</a>
                        <a href="#">Analysis</a>
                        </div>
                </div>
        )}
        </div>
    );
}

export default MenuBar;
