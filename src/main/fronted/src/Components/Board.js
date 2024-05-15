import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { isMenuOpen } from './MenuBar.js';
import Writing from "./Writing";

function Board() {
    const [hello, setHello] = useState('No data');
    
    useEffect(() => {
        axios.get('/api/test')
            .then((res) => {
                setHello(res.data);
            })
    }, []);

    // 게시판 누르면 세부로 이동
    const navigate = useNavigate();
    
        const handleRowClick = () => {
            navigate('/Board'); // 상대 경로나 절대 경로 사용
        };

    return (
        <div className='root'>
            <Writing></Writing>
        </div>
    );

}

export default Board;
