import React from 'react';
import './BoardDetail.css';
function BoardDetail() {

    return (
        <div className="container">
            <h1>게시글 제목</h1>
            <div className="post">
                <p className="post-content">
                    게시글 내용
                </p>
                <div className="buttons">
                    <button className="button">수정</button>
                    <button className="button">삭제</button>
                    <button className="button">해결</button>
                </div>
            </div>
        </div>
    );

}

export default BoardDetail;
