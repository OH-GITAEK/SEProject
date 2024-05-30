import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Typography, Box, Button, TextField, MenuItem } from '@mui/material';
import axios from 'axios';

const IssueUpdate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentProject, currentIssue, userRole } = location.state || {}; // location.state로부터 currentProject, currentIssue, userRole 가져옴

    // 이슈 업데이트 상태 관리
    const [issueTitle, setIssueTitle] = useState(currentIssue.issueTitle);
    const [issueDescription, setIssueDescription] = useState(currentIssue.issueDescription);
    const [keyword, setKeyword] = useState(currentIssue.keyword);
    const [priority, setPriority] = useState(currentIssue.priority);
    const [status, setStatus] = useState(currentIssue.status);
    const [assignee, setAssignee] = useState(currentIssue.assignee);
    const [comment, setComment] = useState('');
    
    // 오류시 뒤로 가기
    if (!currentProject || !currentIssue) {
        alert("다시 시도하세요!");
        navigate(-1);
    }

    // 개발자 추천 (미구현)
    const recommendDeveloper = () => {
        // axios.post(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/recommendDeveloper`)
        //     .then(response => {
        //         setAssignee(response.data.recommendedDeveloper);
        //     })
        //     .catch(error => {
        //         console.error('Error recommending developer:', error);
        //     });
    };

    // 이슈 업데이트
    const handleUpdate = () => {
        axios.post(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/update`, {
            issueTitle,
            issueDescription,
            keyword,
            priority,
            status
        })
            .then(response => {
                if (comment) {
                    axios.post(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/comments/create`, {
                        content: comment
                    })
                        .then(response => {
                            navigate(`/Project/${currentProject.projectTitle}/${currentIssue.issueTitle}`, {
                                state: { currentProject, currentIssue: response.data }
                            });
                        })
                        .catch(error => {
                            console.error('Error creating comment:', error);
                        });
                } else {
                    navigate(`/Project/${currentProject.projectTitle}/${currentIssue.issueTitle}`, {
                        state: { currentProject, currentIssue: response.data }
                    });
                }
            })
            .catch(error => {
                console.error('Error updating issue:', error);
            });
    };

    // 상태 변경
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    // 이슈 제목, 설명, 키워드, 우선순위, 상태 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'issueTitle':
                setIssueTitle(value);
                break;
            case 'issueDescription':
                setIssueDescription(value);
                break;
            case 'keyword':
                setKeyword(value.split(','));
                break;
            case 'priority':
                setPriority(value);
                break;
            default:
                break;
        }
    };

    return (
        <Paper sx={{ width: '90%', padding: 3, margin: 'auto', maxWidth: 800 }}>
            <Typography variant="h4" gutterBottom>
                이슈 업데이트
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleUpdate}>
                <TextField
                    label="이슈 제목"
                    name="issueTitle"
                    value={issueTitle}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="이슈 설명"
                    name="issueDescription"
                    value={issueDescription}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                    multiline
                    rows={4}
                />
                <TextField
                    label="키워드"
                    name="keyword"
                    value={keyword.join(',')}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="우선순위"
                    name="priority"
                    value={priority}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="상태"
                    name="status"
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    select
                    margin="normal"
                    fullWidth
                >
                    {['open', 'in-progress', 'fixed', 'resolved', 'closed', 'reopened'].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                {userRole === 'plUser' && (
                    <>
                        <Button onClick={recommendDeveloper} sx={{ marginTop: 2 }}>
                            적절한 개발자 추천
                        </Button>
                        <TextField
                            label="담당자"
                            name="assignee"
                            value={assignee}
                            onChange={(e) => setAssignee(e.target.value)}
                            margin="normal"
                            fullWidth
                        />
                    </>
                )}
                <TextField
                    label="코멘트"
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    margin="normal"
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                    완료
                </Button>
            </Box>
        </Paper>
    );
};

export default IssueUpdate;
