import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Typography, List, ListItem, ListItemText, Box, Button, Divider, IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// 검색바 style
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: 'auto',
    border: '2px solid #03C75A', // 초록색 테두리
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
}));

const ProjectDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { Project } = location.state;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const columns = [
        { id: 'issueTitle', label: 'Title', minWidth: 170 },
        { id: 'issueDescription', label: 'Description', minWidth: 100 },
        { id: 'reportedDate', label: 'Reported Date', minWidth: 170, align: 'right' },
        { id: 'reporter', label: 'Reporter', minWidth: 170, align: 'right' },
    ];

    const [rows, setRows] = useState([
        {
            id: 0,
            projectId: 0,
            issueTitle: "testTitle",
            issueDescription: "testDescription",
            reporter: "lcw",
            fixer: "lcw",
            assignee: "lcw",
            reportedDate: "2024-05-20T09:25:54.489Z",
            priority: "0",
            status: "testing"
        }
    ]);

    useEffect(() => {
        if (Project) {
            axios.get(`/api/projects/${Project.id}/issues`)
                .then((response) => {
                    setRows((prevRows) => [...prevRows, ...response.data]);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [Project]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCreateIssue = () => {
        navigate(`/Project/${Project.projectTitle}/IssueCreate`, { state: {Project}});
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRows = rows.filter(row =>
        row.issueTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.issueDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.reportedDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.reporter.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRowClick = (Issue) => {
        navigate(`/Project/${Project.projectTitle}/${Issue.issueTitle}`, { state: { Issue, Project}});
    };

    const handleDeleteProject = () => {
        // axios.delete(`/api/projects/${Project.projectId}`)
        //     .then(() => {
        //         navigate('/Project');
        //     })
        //     .catch((error) => {
        //         console.error('Error deleting project:', error);
        //     });
    };

    if (!Project) {
        return (
            <Paper sx={{ padding: 3, margin: 'auto', maxWidth: 800 }}>
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
    }

    return (
        <Paper sx={{ width: '90%', padding: 3, margin: 'auto', maxWidth: 800 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4" align="center" gutterBottom >
                    {Project.projectTitle}
                </Typography>
                <Tooltip title="Delete">
                    <IconButton onClick={handleDeleteProject}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1" gutterBottom>
                    {Project.projectDescription}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Reported Date: {Project.reportedDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Admin: {Project.admin.memberName}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 1, width: '100%' }}>
                <Typography variant="h6" align="left">PL Users:</Typography>
                <List dense>
                    {Project.plUser.map((user, index) => (
                        <ListItem key={index} sx={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                            <ListItemText primary={user.memberEmail} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{ marginBottom: 1, width: '100%' }}>
                <Typography variant="h6" align="left">Dev Users:</Typography>
                <List dense>
                    {Project.devUser.map((user, index) => (
                        <ListItem key={index} sx={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                            <ListItemText primary={user.memberEmail} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{ marginBottom: 1, width: '100%' }}>
                <Typography variant="h6" align="left">Test Users:</Typography>
                <List dense>
                    {Project.testUser.map((user, index) => (
                        <ListItem key={index} sx={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                            <ListItemText primary={user.memberEmail} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Issue
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Search>
                <Button variant="contained" sx={{
                    backgroundColor: '#03C75A',
                    '&:hover': {
                        backgroundColor: '#03C75A',
                    },
                }} onClick={handleCreateIssue}>
                    Issue 생성
                </Button>
            </Box>
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
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => handleRowClick(row)}>
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
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ProjectDetail;
