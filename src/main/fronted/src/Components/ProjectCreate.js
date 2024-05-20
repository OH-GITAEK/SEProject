import React, {useEffect, useState} from 'react';
import './Writing.css';
import {useNavigate} from "react-router-dom";
import axios from "axios"; // 팝업창에 대한 CSS 파일을 import

const ProjectCreate = () => {
    // 게시판 글 생성을 위한 설정
    const [isOpen, setIsOpen] = useState(false); // 팝업창의 열림 여부를 관리하는 상태
    const [issues, setIssues] = useState([]); // 입력된 이슈들을 관리하는 상태

    const togglePopup = () => {
        setIsOpen(!isOpen); // 팝업창의 열림 여부를 반전시킴
    };

    const handleSaveIssue = (e) => {
        e.preventDefault();
        const ProjectID = e.target.ProjectID.value;
        const ProjectIssueID = e.target.ProjectIssueID.value;
        const ProjectContent = e.target.ProjectContent.value;
        const ProjectReportedDate = e.target.ProjectReportedDate.value;
        const ProjectMemberEntity = e.target.ProjectMemberEntity.value;
        setIssues([...issues, {
            id: ProjectID,
            issueID: ProjectIssueID,
            content: ProjectContent,
            reportedDate: ProjectReportedDate,
            memberEntity: ProjectMemberEntity
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
        navigate('/page/Issue'); // 상대 경로나 절대 경로 사용
    };

    return (
        <div className="popup-container">
            <button onClick={togglePopup}>프로젝트 추가</button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>프로젝트 추가</h2>
                        <form onSubmit={handleSaveIssue}>
                            <label htmlFor="ProjectID">ID:</label>
                            <input type="text" id="ProjectID" name="ProjectID"/>

                            <label htmlFor="ProjectIssueID">IssueID:</label>
                            <textarea id="ProjectIssueID" name="ProjectIssueID" rows="4"/>

                            <label htmlFor="ProjectContent">Content:</label>
                            <textarea id="ProjectContent" name="ProjectContent" rows="4"/>

                            <label htmlFor="ProjectReportedDate">ReportedDate:</label>
                            <textarea id="ProjectReportedDate" name="ProjectReportedDate" rows="4"/>

                            <label htmlFor="ProjectMemberEntity">MemberEntity:</label>
                            <textarea id="ProjectMemberEntity" name="ProjectMemberEntity" rows="4"/>


                            <button type="submit">저장</button>
                        </form>
                        <button onClick={togglePopup}>닫기</button>
                    </div>
                </div>
            )}
            <div className="issue-list">
                <h2>저장된 프로젝트</h2>
                <table className="table">
                    <thead className="head">
                    <tr className="rowhead">
                        <td className="cell">ID</td>
                        <td className="cell">IssueID</td>
                        <td className="cell">Content</td>
                        <td className="cell">ReportedDate</td>
                        <td className="cell">MemberEntity</td>
                    </tr>
                    </thead>
                    <tbody className="body">
                    {issues.map((issue, index) => (
                        <tr key={index} className="issue-item">
                            <td className="cell" onClick={handleRowClick}>{issue.id}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.issueID}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.content}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.reportedDate}</td>
                            <td className="cell" onClick={handleRowClick}>{issue.memberEntity}</td>
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

export default ProjectCreate;
