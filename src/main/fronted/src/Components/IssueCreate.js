import React, {useEffect, useState} from 'react';
import './Writing.css';
import {useNavigate} from "react-router-dom";
import axios from "axios"; // 팝업창에 대한 CSS 파일을 import

const IssueCreate = () => {
    // 게시판 글 생성을 위한 설정
    const [isOpen, setIsOpen] = useState(false); // 팝업창의 열림 여부를 관리하는 상태
    const [issues, setIssues] = useState([]); // 입력된 이슈들을 관리하는 상태

    const togglePopup = () => {
        setIsOpen(!isOpen); // 팝업창의 열림 여부를 반전시킴
    };

    const handleSaveIssue = (e) => {
        e.preventDefault();
        const issueTitle = e.target.issueTitle.value;
        const issueDescription = e.target.issueDescription.value;
        const issueReporter = e.target.issueReporter.value;
        const issueReportedDate = e.target.issueReportedDate.value;
        const issueFixer = e.target.issueFixer.value;
        const issueAssignee = e.target.issueAssignee.value;
        const issuePriority = e.target.issuePriority.value;
        const issueStatus = e.target.issueStatus.value;
        const issueComment = e.target.issueComment.value;
        const issueHistory = e.target.issueHistory.value;
        setIssues([...issues, {
            title: issueTitle,
            description: issueDescription,
            reporter: issueReporter,
            reportedDate: issueReportedDate,
            fixer: issueFixer,
            assignee: issueAssignee,
            priority: issuePriority,
            status: issueStatus,
            comment: issueComment,
            history: issueHistory
        }]);
        togglePopup(); // 이슈를 저장한 후 팝업창을 닫음
    };

    const handleDeleteIssue = (index) => {
        const updatedIssues = [...issues];
        updatedIssues.splice(index, 1);
        setIssues(updatedIssues);
    };

    /////////////////////////////////////////////////////////////////
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
        navigate('/page/Issue/board'); // 상대 경로나 절대 경로 사용
    };

    return (
        <div className="popup-container">
            <button onClick={togglePopup}>이슈 추가</button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>이슈 추가</h2>
                        <form onSubmit={handleSaveIssue}>
                            <label htmlFor="issueTitle">Title:</label>
                            <input type="text" id="issueTitle" name="issueTitle"/>

                            <label htmlFor="issueDescription">Description:</label>
                            <textarea id="issueDescription" name="issueDescription" rows="4"/>

                            <label htmlFor="issueReporter">Reporter:</label>
                            <textarea id="issueReporter" name="issueReporter" rows="4"/>

                            <label htmlFor="issueReportedDate">ReportedDate:</label>
                            <textarea id="issueReportedDate" name="issueReportedDate" rows="4"/>

                            <label htmlFor="issueFixer">Fixer:</label>
                            <textarea id="issueFixer" name="issueFixer" rows="4"/>

                            <label htmlFor="issueAssignee">Assignee:</label>
                            <textarea id="issueAssignee" name="issueAssignee" rows="4"/>

                            <label htmlFor="issuePriority">Priority:</label>
                            <textarea id="issuePriority" name="issuePriority" rows="4"/>

                            <label htmlFor="issueStatus">Priority:</label>
                            <textarea id="issueStatus" name="issueStatus" rows="4"/>

                            <label htmlFor="issueComment">Comment:</label>
                            <textarea id="issueComment" name="issueComment" rows="4"/>

                            <label htmlFor="issueHistory">History:</label>
                            <textarea id="issueHistory" name="issueHistory" rows="4"/>

                            <button type="submit">저장</button>
                        </form>
                        <button onClick={togglePopup}>닫기</button>
                    </div>
                </div>
            )}
            <div className="issue-list">
                <h2>저장된 이슈</h2>
                <table className="table">
                    <thead className="head">
                    <tr className="rowhead">
                        <td className="cell">Title</td>
                        <td className="cell">Description</td>
                        <td className="cell">Reporter</td>
                        <td className="cell">ReportedDate</td>
                        <td className="cell">Fixer</td>
                        <td className="cell">Assignee</td>
                        <td className="cell">Priority</td>
                        <td className="cell">Status</td>
                        <td className="cell">Comment</td>
                        <td className="cell">History</td>
                    </tr>
                    </thead>
                    <tbody className="body">
                    {issues.map((issue, index) => (
                        <tr key={index} className="issue-item">
                            <td className="cell" onClick={handleRowClick}>{issue.title}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.description}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.reporter}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.reportedDate}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.fixer}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.assignee}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.priority}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.status}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.comment}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.history}</td>
                            <td>
                                <button onClick={() => handleDeleteIssue(index)}>삭제</button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IssueCreate;
