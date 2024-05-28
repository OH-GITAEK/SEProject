import React, {useContext, useEffect, useState} from 'react';
import './Writing.css';
import axios from "axios"; // 팝업창에 대한 CSS 파일을 import
import { useNavigate, useLocation } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Autocomplete, Chip} from "@mui/material";
import Button from "@mui/material/Button";
import {ProjectContext} from "./Projectcontext";

const IssueCreate = () => {
    const [issueTitle, setIssueTitle] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const { projectData, setProjectData } = useContext(ProjectContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { Project } = location.state;
    const handleCreate = () => {
        axios.post(`/api/projects/${Project.id}/issues/create`, {
            issueTitle: issueTitle,
            issueDescription: issueDescription
        })
            .then((response) => {
                console.log(response);
                alert('이슈 생성이 완료되었습니다.');
            })
            .catch(function (error) {
                console.error('Error:', error);
                if (error.response) {
                    // 서버가 응답했지만 상태 코드가 2xx 범위에 있지 않음
                    console.error('Server responded with status:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else if (error.request) {
                    // 요청이 만들어졌으나 응답을 받지 못함
                    console.error('No response received:', error.request);
                } else {
                    // 요청을 설정하는 중에 문제가 발생함
                    console.error('Error setting up request:', error.message);
                }
                alert('이슈를 다시 생성해주세요.');
            });
            // .catch(function (error) {
            //     console.log(error);
            //     alert('이슈를 다시 생성해주세요.');
            // });
        navigate(`/Project/${projectData.projectTitle}`);
    };

    /* 삭제 기능 구현 필요
    const handleDeleteIssue = (index) => {
        const updatedIssues = [...issues];
        updatedIssues.splice(index, 1);
        setIssues(updatedIssues);
    };
    */
    /////////////////////////////////////////////////////////////////

    // 게시판 누르면 세부로 이동


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

