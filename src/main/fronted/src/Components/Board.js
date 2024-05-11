import React, {useEffect, useState} from 'react';
import axios from "axios";

function Board() {
    const [hello, setHello] = useState('No data');

    useEffect(() => {
        axios.get('/api/test')
            .then((res) => {
                setHello(res.data);
            })
    }, []);

    return (
        <div className="root">
            <table className="table">
                <thead className="head">
                <tr className="row">
                    <td className="cell">Title</td>
                    <td className="cell">Description</td>
                    <td className="cell">Reporter</td>
                    <td className="cell">ReportedDate</td>
                    <td className="cell">Comment</td>
                    <td className="cell">History</td>
                </tr>
                </thead>
                <tbody className="body">
                <tr className="row">
                    <td className="cell"><a href='/board'>{hello}</a></td>
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
