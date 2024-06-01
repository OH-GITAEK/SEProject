import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Typography, Box, Button, TextField, Autocomplete } from '@mui/material';
import axios from 'axios';
import Chip from "@mui/material/Chip";
import { UserContext } from "./Usercontext";

// 키워드 목록
const options = [
    "디버깅", "로그 분석", "버그 수정", "코드 리뷰", "에러 메시지 분석", "핫픽스 배포",
    "문제 재현", "테스트 케이스 작성", "성능 튜닝", "코드 롤백", "기술 지원", "패치 적용",
    "기능 테스트", "환경 설정", "임시 해결책", "원인 추적", "시스템 모니터링", "오류 로그 수집",
    "기술 문서 참조", "협업 툴 사용", "기타"
];

const IssueUpdate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentProject, currentIssue, userRole } = location.state || { currentProject: {}, currentIssue: {}, userRole: '' }; // location.state로부터 currentProject, currentIssue, userRole 가져옴
    const { userData } = useContext(UserContext);

    // 이슈 업데이트 상태 관리 변수
    const [issueTitle, setIssueTitle] = useState(currentIssue.issueTitle || '');
    const [issueDescription, setIssueDescription] = useState(currentIssue.issueDescription || '');
    const [keyword, setKeyword] = useState(currentIssue.keyWords || []);
    const [priority, setPriority] = useState(currentIssue.priority || '');
    const [status, setStatus] = useState(currentIssue.status || '');
    const [assignee, setAssignee] = useState(currentIssue.assignee || '');
    const [comment, setComment] = useState('');

    const [recommends, setRecommends] = useState(currentProject.devUser || []); // 기본 개발자 추천버튼 누르면 추천인으로 변경
    const statusOptions = ['new', 'open', 'in-progress', 'fixed', 'resolved', 'closed', 'reopened'];

    // 역할에 따른 option 비활성화 상태 설정
    const isOptionDisabled = (option) => {
        if (option === 'new') return true;
        if (userRole === 'devUser' && option !== 'fixed') return true;
        if (userRole === 'testUser' && currentIssue.reporter === userData.memberName) {
            if (option !== 'resolved' && option !== 'reopened') return true;
        }
        return userRole === 'plUser' && option !== 'closed';
    };

    // 역할에 따른 수정권한
    const tagDisabled = () => {
        return !(userRole === 'testUser' && currentIssue.reporter === userData.memberName);
    }

    const comboDisabled = () => {
        return userRole !== 'plUser';
    }

    // 오류시 뒤로 가기
    if (!currentIssue.issueTitle) {
        alert("다시 시도하세요!");
        navigate(`/Project/${currentProject.projectTitle}`);
    }

    // 개발자 추천
    const recommendDeveloper = () => {
        axios.post(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/recommend`, { keyword })
            .then(response => {
                setRecommends(response.data.devUser);
            })
            .catch(error => {
                console.error('Error recommending developer:', error);
            });
    };

    // 이슈 업데이트
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.post(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/update`, {
            issueTitle: issueTitle,
            issueDescription: issueDescription,
            keyWords: keyword,
            priority: priority,
            status: status
        })
            .then(response => {
                if (userRole === 'plUser' && assignee !== currentIssue.assignee) {
                    axios.post(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/update-dev`, { assignee })
                        .catch(error => {
                            console.error('assign Error:', error);
                        })
                }
                if (comment) {
                    axios.post(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/comments/create`, {
                        content: comment
                    })
                        .then(response => {
                            navigate(`/Project/${currentProject.projectTitle}`, {
                                state: { currentProject, currentIssue: response.data }
                            });
                        })
                        .catch(error => {
                            console.error('Error creating comment:', error);
                        });
                } else {
                    navigate(`/Project/${currentProject.projectTitle}/`, {
                        state: { currentProject, currentIssue: response.data }
                    });
                }
            })
            .catch(error => {
                console.error('Error updating issue:', error);
            });
    };

    // 상태 변경
    const handleStatusChange = (event, newValue) => {
        setStatus(newValue);
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
                이슈 수정
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleUpdate}>
                <TextField
                    label="이슈 제목"
                    name="issueTitle"
                    color='success'
                    value={issueTitle}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                    disabled={tagDisabled()}
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
                <TextField
                    label="이슈 내용"
                    name="issueDescription"
                    color='success'
                    value={issueDescription}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                    multiline
                    rows={6}
                    disabled={tagDisabled()}
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
                <Autocomplete
                    multiple
                    id="keyword"
                    options={options}
                    required
                    value={keyword}
                    fullWidth
                    margin="normal"
                    onChange={(event, newValue) => {
                        setKeyword(newValue);
                    }}
                    freeSolo
                    disabled={tagDisabled()}
                    isOptionEqualToValue={(option, value) => option === value || value === "" || option === ""}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
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
                            label="키워드"
                            margin="normal"
                        />
                    )}
                />
                <Autocomplete
                    id="priority"
                    options={["blocker", "critical", "major", "minor", "trivial"]}
                    required
                    disabled={tagDisabled()}
                    value={priority}
                    onChange={(event, newValue) => {
                        setPriority(newValue);
                    }}
                    sx={{ width: '25%', alignSelf: 'start' }}
                    margin="normal"
                    disablePortal
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
                                    '&:hover fieldset': {
                                        borderColor: '#03C75A', // hover 시 테두리 색상
                                    },
                                },
                            }}
                            label="우선순위"
                            margin="normal"
                        />
                    )}
                />
                <Autocomplete
                    options={statusOptions}
                    value={status}
                    sx={{ width: '25%', alignSelf: 'start' }}
                    onChange={handleStatusChange}
                    getOptionDisabled={isOptionDisabled}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="상태"
                            margin="normal"
                            fullWidth
                            color='success'
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
                    )}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Autocomplete
                        id="assignee"
                        options={recommends}
                        required
                        disabled={comboDisabled()}
                        value={assignee}
                        onChange={(event, newValue) => {
                            setAssignee(newValue);
                        }}
                        sx={{ width: '25%' }}
                        margin="normal"
                        disablePortal
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
                                        '&:hover fieldset': {
                                            borderColor: '#03C75A', // hover 시 테두리 색상
                                        },
                                    },
                                }}
                                label="담당자"
                                margin="normal"
                            />
                        )}
                    />
                    {userRole === 'plUser' && (
                        <>
                            <Button
                                onClick={recommendDeveloper}
                                variant="contained"
                                sx={{
                                    ml: 2,
                                    mt: 1,
                                    backgroundColor: '#03C75A', // 네이버 초록색
                                    '&:hover': {
                                        backgroundColor: '#03C75A', // 네이버 초록색 호버
                                    },
                                }}
                            >
                                추천
                            </Button>
                        </>
                    )}
                </Box>
                <TextField
                    label="코멘트"
                    color="success"
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    margin="normal"
                    fullWidth
                    multiline
                    rows={2}
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
                <Button type="submit" variant="contained" sx={{
                    mt: 3, marginTop: 2, backgroundColor: '#03C75A', // 네이버 초록색
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

export default IssueUpdate;
