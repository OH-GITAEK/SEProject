import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Typography, Box, Button, TextField, Autocomplete } from '@mui/material';
import axios from 'axios';
import Chip from "@mui/material/Chip";

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

    // 이슈 업데이트 상태 관리
    const [issueTitle, setIssueTitle] = useState(currentIssue.issueTitle || '');
    const [issueDescription, setIssueDescription] = useState(currentIssue.issueDescription || '');
    const [keyword, setKeyword] = useState(currentIssue.keyword || []);
    const [priority, setPriority] = useState(currentIssue.priority || '');
    const [status, setStatus] = useState(currentIssue.status || '');
    const [assignee, setAssignee] = useState(currentIssue.assignee || '');
    const [comment, setComment] = useState('');

    const statusOptions = ['new', 'open', 'in-progress', 'fixed', 'resolved', 'closed', 'reopened'];

    // 역할에 따른 비활성화 상태 설정
    const isOptionDisabled = (option) => {
        if (option === 'new') return true;
        if (userRole === 'devUser' && option !== 'fixed') return true;
        if (userRole === 'testUser' && currentIssue.reporter === 'testUser') {
            if (option !== 'resolved' && option !== 'reopened') return true;
        }
        if (userRole === 'plUser' && option !== 'closed') return true;
        return false;
    };

    // 오류시 뒤로 가기
    if (!currentIssue.issueTitle) {
        alert("다시 시도하세요!");
        navigate('/Project');
    }

    // 개발자 추천 (미구현)
    const recommendDeveloper = () => {
        alert('미구현');
        // axios.post(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/recommendDeveloper`)
        //     .then(response => {
        //         setAssignee(response.data.recommendedDeveloper);
        //     })
        //     .catch(error => {
        //         console.error('Error recommending developer:', error);
        //     });
    };

    // 이슈 업데이트
    const handleUpdate = (e) => {
        e.preventDefault();
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
                이슈 업데이트
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleUpdate}>
                <TextField
                    label="이슈 제목"
                    name="issueTitle"
                    color = 'success'
                    value={issueTitle}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
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
                    color = 'success'
                    value={issueDescription}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                    multiline
                    rows={4}
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
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                            const tagProps = getTagProps({ index });
                            return <Chip key={index} variant="outlined" label={option} {...tagProps} />;
                        })
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
                            required
                            margin="normal"
                        />
                    )}
                />
                <TextField
                    label="우선순위"
                    name="priority"
                    color = 'success'
                    value={priority}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
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
                    options={statusOptions}
                    value={status}
                    color = 'success'
                    onChange={handleStatusChange}
                    getOptionDisabled={isOptionDisabled}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="상태"
                            margin="normal"
                            fullWidth
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
                {userRole === 'plUser' && (
                    <>
                        <Button onClick={recommendDeveloper} sx={{
                            marginTop: 2,
                            backgroundColor: '#03C75A', // 네이버 초록색
                            '&:hover': {
                                backgroundColor: '#03C75A', // 네이버 초록색 호버
                            },
                        }}>
                            적절한 개발자 추천
                        </Button>
                        <TextField
                            label="담당자"
                            color = 'success'
                            name="assignee"
                            value={assignee}
                            onChange={(e) => setAssignee(e.target.value)}
                            margin="normal"
                            fullWidth
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
                <Button type="submit" variant="contained" sx={{ marginTop: 2, backgroundColor: '#03C75A', // 네이버 초록색
                    '&:hover': {
                        backgroundColor: '#03C75A', // 네이버 초록색 호버
                    }, }}>
                    완료
                </Button>
            </Box>
        </Paper>
    );
};

export default IssueUpdate;
