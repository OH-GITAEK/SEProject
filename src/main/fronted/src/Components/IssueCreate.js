import React, { useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

// 키워드 목록
const options = [
    "디버깅", "로그 분석", "버그 수정", "코드 리뷰", "에러 메시지 분석", "핫픽스 배포",
    "문제 재현", "테스트 케이스 작성", "성능 튜닝", "코드 롤백", "기술 지원", "패치 적용",
    "기능 테스트", "환경 설정", "임시 해결책", "원인 추적", "시스템 모니터링", "오류 로그 수집",
    "기술 문서 참조", "협업 툴 사용", "기타"
];


const IssueCreate = () => {
    const location = useLocation();
    const [issueTitle, setIssueTitle] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const { currentProject } = location.state || {};
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState([]);
    const [priority, setPriority] = useState('major');

    const handleCreate = () => {
        axios.post(`/api/projects/${currentProject.id}/issues/create`, {
            issueTitle: issueTitle,
            issueDescription: issueDescription,
            status: 'new',
            priority: priority
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
                    rows={6}
                    color="success"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#03C75A', // 포커스 시 테두리 색상
                            },
                        },
                    }}
                />
                {/*keyword Autocomplete 추가*/}
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
                <Autocomplete
                    id="priority"
                    options={["blocker","critical","major","minor","trivial"]}
                    required
                    value={priority}
                    onChange={(event, newValue) => {
                        setPriority(newValue);
                    }}
                    sx={{width: '25%'}}
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
                                },
                                width: '300'
                            }}
                            label="우선순위"
                            required
                            margin="normal"
                        />
                    )}
                />
                <Button variant="contained" onClick={handleCreate} sx={{ mt: 3,
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
