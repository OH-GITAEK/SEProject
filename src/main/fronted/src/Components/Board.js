import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { isMenuOpen } from './MenuBar.js';

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
            <table className="table">
                <thead className="head">
                <tr className="rowhead">
                    <td className="cell">Title</td>
                    <td className="cell">Description</td>
                    <td className="cell">Reporter</td>
                    <td className="cell">ReportedDate</td>
                    <td className="cell">Comment</td>
                    <td className="cell">History</td>
                </tr>
                </thead>
                <tbody className="body">
                <tr className="row" onClick={handleRowClick}>
                    <td className="cell">{hello}</td>
                    <td className="cell">{hello}</td>
                    <td className="cell">{hello}</td>
                    <td className="cell">{hello}</td>
                    <td className="cell">{hello}</td>
                    <td className="cell">{hello}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );

}

export default Board;
