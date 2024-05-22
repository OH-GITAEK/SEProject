import React from 'react';
import Writing from "./Writing";
import "./Board.css";

function Board() {
    // 게시판 컴포넌트
    return (
        <div className='root'>
            <Writing></Writing>
        </div>
    );

}

export default Board;
