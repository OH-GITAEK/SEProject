import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from "axios";
import {Autocomplete, Chip} from "@mui/material";

export default function ProjectCreate(){
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [plUser, setPlUser] = useState('');
    const [devUser, setDevUser] = useState('');
    const [testUser, setTestUser] = useState('');
    const navigate = useNavigate();

    const handleCreate = () => {
        axios.post('/api/projects/create', {
            projectTitle: projectTitle,
            projectDescription: projectDescription,
            plUser: plUser,
            devUser: devUser,
            testUser: testUser
        })
            .then((response) => {
                console.log(response);
                alert('프로젝트 생성이 완료되었습니다.');
            })
            .catch(function (error) {
                console.log(error);
                alert('프로젝트를 다시 생성해주세요.');
            });
        navigate('/Project');
    };

    return (
        <Paper sx={{ width: '90%', margin: 'auto', padding: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>새 프로젝트</Typography>
                <TextField
                    label="제목"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
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
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
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
                <Autocomplete
                multiple
                id="tags-filled"
                options={[]}
                fullWidth
                required
                value={plUser}
                onChange={(event, newValue) => {
                    setPlUser(newValue);
                }}
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        color="success"
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#03C75A', // 포커스 시 테두리 색상
                                },
                            },
                        }}
                        label="PL"
                        required
                        margin="normal"
                    />
                )}
            />
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={[]}
                    fullWidth
                    required
                    value={devUser}
                    onChange={(event, newValue) => {
                        setDevUser(newValue);
                    }}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            color="success"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#03C75A', // 포커스 시 테두리 색상
                                    },
                                },
                            }}
                            label="Dev"
                            required
                            margin="normal"
                        />
                    )}
                />
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={[]}
                    fullWidth
                    required
                    value={testUser}
                    onChange={(event, newValue) => {
                        setTestUser(newValue);
                    }}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            color="success"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#03C75A', // 포커스 시 테두리 색상
                                    },
                                },
                            }}
                            label="Tester"
                            required
                            margin="normal"
                        />
                    )}
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
