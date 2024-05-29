import React, { useEffect, useContext, useState } from 'react';
import { useLocation} from 'react-router-dom';
import { Paper, Typography, Box, Button, Divider, IconButton, Tooltip, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled} from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { UserContext } from './Usercontext';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
}));

const IssueDetail = () => {
    const location = useLocation();
    const { Project, Issue } = location.state || {};
    const [currentProject, setCurrentProject] = useState(Project);
    const [currentIssue, setCurrentIssue] = useState(Issue);
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const columns = [
        { id: 'memberEntity', label: 'Member Entity', minWidth: 170, align: 'left' },
        { id: 'content', label: 'Content', minWidth: 170, align: 'center' },
    ];
    const { currentProjectId, currentIssueId } = useContext(UserContext);

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!Issue || !Project) {
            axios.get(`/api/projects/${currentProjectId}`)
                .then((response) => {
                    setCurrentProject(response.data);
                    axios.get(`/api/projects/${currentProjectId}/issues/${currentIssueId}`)
                        .then((response) => {
                            setCurrentIssue(response.data);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error('Error fetching issue data:', error);
                            setLoading(false);
                        });
                })
                .catch((error) => {
                    console.error('Error fetching project data:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [currentProjectId, currentIssueId, Issue, Project]);

    useEffect(() => {
        if (currentIssue) {
            axios.get(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/comments`)
                .then((response) => {
                    setRows(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching comments:', error);
                });
        }
    }, [currentProject, currentIssue]);

    const [newComment, setNewComment] = useState('');
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/projects/${currentProject.id}/issues/${currentIssue.id}/comments/create`, {
            content: newComment
        })
            .then((response) => {
                setRows(prevRows => [...prevRows, response.data]);
                setNewComment('');
            })
            .catch((error) => {
                console.log(error);
                alert('코멘트 등록 실패');
            });
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const displayedRows = rows.slice(0, (page + 1) * rowsPerPage);

    if (loading) {
        return (
            <Paper sx={{ padding: 3, margin: 'auto', maxWidth: 800 }}>
                <Typography variant="h5" gutterBottom>
                    Loading...
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ width: '90%', padding: 3, margin: 'auto', maxWidth: 800 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    {currentIssue.issueTitle}
                </Typography>
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
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
                    <Button onClick={handleLoadMore} variant="contained" color="primary">
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
