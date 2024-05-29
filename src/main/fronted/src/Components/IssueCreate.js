import React, { useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const IssueCreate = () => {
    const location = useLocation();
    const [issueTitle, setIssueTitle] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [issueAssignee, setAssignee] = useState('');
    const { currentProject } = location.state || {};
    const navigate = useNavigate();

    const handleCreate = () => {
        axios.post(`/api/projects/${currentProject.id}/issues/create`, {
            issueTitle: issueTitle,
            issueDescription: issueDescription
        })
            .then((response) => {
                console.log(response);
                return axios.post(`/api/projects/${currentProject.id}/issues/${response.data.id}/update-dev`, {
                    assignee: issueAssignee
                });
            })
            .then(() => {
                alert('이슈 생성이 완료되었습니다.');
                navigate(`/Project/${currentProject.projectTitle}`);
            })
            .catch((error) => {
                console.log(error);
                alert('이슈를 다시 생성해주세요.');
            });
    };

    return (
        <Paper sx={{ width: '90%', margin: 'auto', padding: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>새 이슈</Typography>
                <TextField
                    label="제목"
                    value={issueTitle}
                    onChange={(e) => setIssueTitle(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    color="success"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#03C75A', // 포커스 시 테두리 색상
                            },
                        },
                    }}
                />
                <TextField
                    label="내용"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    multiline
                    required
                    rows={4}
                    color="success"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#03C75A', // 포커스 시 테두리 색상
                            },
                        },
                    }}
                />
                <TextField
                    label="담당자"
                    value={issueAssignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    margin="normal"
                    color="success"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#03C75A', // 포커스 시 테두리 색상
                            },
                            '& .MuiInputLabel-root': {
                                color: '#03C75A', // 기본 레이블 색상
                            },
                        },
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleCreate} sx={{ mt: 3,
                    backgroundColor: '#03C75A', // 네이버 초록색
                    '&:hover': {
                        backgroundColor: '#03C75A', // 네이버 초록색 호버
                    },
                }}>
                    완료
                </Button>
            </Box>
        </Paper>
    );
};

export default IssueCreate;
