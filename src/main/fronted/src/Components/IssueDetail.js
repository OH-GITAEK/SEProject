import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Box, Button, Divider, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { UserContext } from './Usercontext';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledTableRow = styled(TableRow)(({ }) => ({}));

const StyledSpeedDial = styled(SpeedDial)(({ }) => ({
    '& .MuiSpeedDial-fab': {
        backgroundColor: '#03C75A',
        padding: 'none',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#03C75A',
            padding: 'none'
        },
    },
}));

const actions = [
    { icon: <EditIcon />, name: '수정' },
    { icon: <DeleteIcon />, name: '삭제' }
];

const IssueDetail = () => {
    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState({});
    const [currentIssue, setCurrentIssue] = useState({});
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const columns = [
        { id: 'memberEntity', label: '계정', minWidth: 170, align: 'left' },
        { id: 'content', label: '내용', minWidth: 170, align: 'center' },
        { id: 'reportedDate', label: '날짜', minWidth: 170, align: 'right' }
    ];
    const { userData, currentProjectId, currentIssueId } = useContext(UserContext); // UserContext로부터 변수 상속

    const [rows, setRows] = useState([]);

    // Project 또는 Issue가 없을 경우 서버에서 데이터 가져옴
    useEffect(() => {
        if (currentProjectId || currentIssueId) {
            axios.get(`/api/projects/${currentProjectId}`)
                .then((response) => {
                    setCurrentProject(response.data);
                    axios.get(`/api/projects/${currentProjectId}/issues/${currentIssueId}`)
                        .then((response) => {
                            setCurrentIssue(response.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching issue data:', error);
                            navigate('/Project');
                        });
                })
                .catch((error) => {
                    console.error('Error fetching project data:', error);
                    navigate('/Project');
                });
        }
    }, [currentProjectId, currentIssueId, navigate]);

    // 현재 이슈의 댓글 데이터 가져옴
    useEffect(() => {
        if (currentIssue && currentIssue.id) {
            axios.get(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/comments`)
                .then((response) => {
                    setRows(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching comments:', error);
                });
        }
    }, [currentProject, currentIssue]);

    // 새로운 댓글 작성
    const [newComment, setNewComment] = useState('');
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/comments/create`, {
            content: newComment
        })
            .then((response) => {
                setRows(response.data);
                setNewComment('');
            })
            .catch((error) => {
                console.log(error);
                alert('코멘트 등록 실패');
            });
    };

    // 더 보기 버튼 클릭 시 페이지 증가
    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const displayedRows = rows.slice(0, (page + 1) * rowsPerPage);

    // 수정 버튼 클릭 시 이동
    const handleEditClick = () => {
        let userRole = 'none';
        if (currentProject.plUser.includes(userData.memberName)) {
            userRole = 'plUser';
        } else if (currentProject.devUser.includes(userData.memberName)) {
            userRole = 'devUser';
        } else if (currentProject.testUser.includes(userData.memberName) && currentIssue.reporter === userData.memberName) {
            userRole = 'testUser';
        }

        if (userRole !== 'none') {
            navigate(`/Project/${currentProject.projectTitle}/${currentIssue.issueTitle}/IssueUpdate`, {
                state: { currentProject, currentIssue, userRole }
            });
        } else {
            alert("수정 권한이 없습니다.");
        }
    };

    return (
        <Paper sx={{ width: '90%', padding: 3, margin: 'auto', maxWidth: 800 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    {currentIssue.issueTitle}
                </Typography>
                <StyledSpeedDial
                    ariaLabel="menu"
                    icon={<MoreVertIcon />}
                    direction='down'
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.name === '수정' ? handleEditClick : null}
                        />
                    ))}
                </StyledSpeedDial>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1" gutterBottom>
                    {currentIssue.issueDescription}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Reporter: {currentIssue.reporter}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Fixer: {currentIssue.fixer}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Assignee: {currentIssue.assignee}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Reported Date: {currentIssue.reportedDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Priority: {currentIssue.priority}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Status: {currentIssue.status}
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <TableContainer sx={{ maxHeight: 440, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedRows.map((row) => (
                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {value}
                                        </TableCell>
                                    );
                                })}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {displayedRows.length < rows.length && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button onClick={handleLoadMore} color="success">
                        더보기
                    </Button>
                </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <TextField
                    label="댓글을 입력하세요"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
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
                        marginRight: 2
                    }}
                />
                <Button onClick={handleCommentSubmit} variant="contained" sx={{
                    marginTop: 1,
                    backgroundColor: '#03C75A', // 네이버 초록색
                    '&:hover': {
                        backgroundColor: '#03C75A', // 네이버 초록색 호버
                    },
                }}>
                    입력
                </Button>
            </Box>
        </Paper>
    );
};

export default IssueDetail;
