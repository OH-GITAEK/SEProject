import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {Paper, Typography, Box, Button, Divider, IconButton, Tooltip, TextField} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled, alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { UserContext } from './Usercontext';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
}));

const IssueDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { Project, Issue } = location.state || {}; // 수정
    const [currentProject, setCurrentProject] = useState(Project);
    const [currentIssue, setCurrentIssue] = useState(Issue);
    const [page] = useState(0);
    const rowsPerPage = useState(10);
    const searchQuery = useState('');
    const columns = [
        { id: 'content', label: 'Content', minWidth: 170 },
        { id: 'reportedDate', label: 'Reported Date', minWidth: 170, align: 'right' },
        { id: 'memberEntity', label: 'memberEntity', minWidth: 170, align: 'right' },
    ];
    const {currentProjectId, currentIssueId} = useContext(UserContext);

    const [rows, setRows] = useState([
        {
            id: 0,
            issueId: 0,
            content: "",
            reportedDate: "",
            memberEntity: ""
        }
    ]);

    /*코멘트 표시 관련----------------------------------------------------------------------------------------------------*/

    if (!Issue || !Project) {
        axios.get(`/api/projects/${currentProjectId}`)
            .then((response) => {
                setCurrentProject(response.data);
                axios.get(`/api/projects/${currentProjectId}/issues/${currentIssueId}`)
                    .then((response) => {
                        setCurrentIssue(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                        return (
                            <Paper sx={{padding: 3, margin: 'auto', maxWidth: 800}}>
                                <Typography variant="h5" gutterBottom>
                                    연결 끊김
                                </Typography>
                                <Button variant="contained" onClick={() => navigate('/Project')} sx={{
                                    mt: 2,
                                    backgroundColor: '#03C75A', // 네이버 초록색
                                    '&:hover': {
                                        backgroundColor: '#03C75A', // 네이버 초록색 호버
                                    },
                                }}>
                                    뒤로 가기
                                </Button>
                            </Paper>
                        );
                    });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                return (
                    <Paper sx={{padding: 3, margin: 'auto', maxWidth: 800}}>
                        <Typography variant="h5" gutterBottom>
                            연결 끊김
                        </Typography>
                        <Button variant="contained" onClick={() => navigate('/Project')} sx={{
                            mt: 2,
                            backgroundColor: '#03C75A', // 네이버 초록색
                            '&:hover': {
                                backgroundColor: '#03C75A', // 네이버 초록색 호버
                            },
                        }}>
                            뒤로 가기
                        </Button>
                    </Paper>
                );
            });
    }

    useEffect(() => {
        if (currentIssue) {
            axios.get(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/comments`)
                .then((response) => {
                    setRows(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [currentProject,currentIssue]);


    const filteredRows = rows.filter(row =>
        row.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.reportedDate.includes(searchQuery.toLowerCase()) ||
        row.memberEntity.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /*코멘트 생성 관련---------------------------------------------------------------------------------------------------*/
    const [newComment, setNewComment] = useState(null);
    const handleCommentSubmit = () => {
        axios.post(`/api/projects/${Project.id}/issues/${Issue.id}/comments/create`, {
            content: newComment
        })
            .then((response) => {
                console.log(response);
                navigate(0); //새로고침
            })
            .catch(function (error) {
                console.log(error);
                alert('코멘트 등록 실패');
            });
    };

    /*컴포넌트----------------------------------------------------------------------------------------------------------*/
    return (
        <Paper sx={{ width: '90%', padding: 3, margin: 'auto', maxWidth: 800 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4" align="center" gutterBottom >
                    {Issue.issueTitle}
                </Typography>
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1" gutterBottom>
                    {Issue.issueDescription}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    reporter: {Issue.reporter}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    fixer: {Issue.fixer}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    assignee: {Issue.assignee}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    reportedDate: {Issue.reportedDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    priority: {Issue.priority}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    status: {Issue.status}
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
                        {filteredRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
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
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
                <form onSubmit={handleCommentSubmit}>
                    <TextField
                        label="댓글을 입력하세요"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Comment
                    </Button>
                </form>
            </Box>
        </Paper>
    );
};

export default IssueDetail;
