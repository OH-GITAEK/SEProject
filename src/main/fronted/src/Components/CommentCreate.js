import React, {useContext, useEffect, useState} from 'react';
import './Writing.css';
import axios from "axios"; // 팝업창에 대한 CSS 파일을 import
import { useNavigate } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Autocomplete, Chip} from "@mui/material";
import Button from "@mui/material/Button";
import {ProjectContext} from "./Projectcontext";
import {IssueContext} from "./Issuecontext";

const CommentCreate = () => {
    const [content, setContent] = useState('');
    const { projectData, setProjectData } = useContext(ProjectContext);
    const { issueData, setIssueData } = useContext(IssueContext);
    const navigate = useNavigate();

    const handleCreate = () => {
        axios.post(`/api/projects/${projectData.projectTitle}/issues/${issueData.issueId}/comments/create`, {
            content: content
        })
            .then((response) => {
                console.log(response);
                alert('코멘트 생성이 완료되었습니다.');
            })
            .catch(function (error) {
                console.log(error);
                alert('코멘트를 다시 생성해주세요.');
            });
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
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>새 코멘트</Typography>
                <TextField
                    label="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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

export default CommentCreate;