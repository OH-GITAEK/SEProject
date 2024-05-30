import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper, Typography, List, Box, Button, Divider, Chip, Avatar,
    Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, styled, alpha, InputBase
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { UserContext } from "./Usercontext";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BarChartIcon from '@mui/icons-material/BarChart';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
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
    { icon: <DeleteIcon />, name: '삭제' },
    { icon: <BarChartIcon />, name: '분석' }
];

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
    sessionStorage.removeItem('currentIssueId');
    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const { currentProjectId, setCurrentIssueId } = useContext(UserContext); // UserContext로부터 변수 상속
    // 이슈 간단
    const columns = [
        { id: 'issueTitle', label: '제목', minWidth: 170 },
        { id: 'assignee', label: '담당자', minWidth: 170},
        { id: 'status', label: '상태', minWidth: 170, align: 'right' },
        { id: 'priority', label: '우선순위', minWidth: 170, align: 'right' },
        { id: 'reporter', label: '작성자', minWidth: 170, align: 'right' }
    ];

    const [rows, setRows] = useState([]);
    /*참조 중인 프로젝트 가져오기*/
    useEffect(() => {
        if (currentProjectId) {
            axios.get(`/api/projects/${currentProjectId}`)
                .then((response) => {
                    setCurrentProject(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [currentProject,currentProjectId]);

    useEffect(() => {
        if (currentProject && currentProject.id) {
            axios.get(`/api/projects/${currentProject.id}/issues`)
                .then((response) => {
                    setRows(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [currentProject]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCreateIssue = () => {
        navigate(`/Project/${currentProject.projectTitle}/IssueCreate`, { state: { currentProject } });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRows = rows.filter(row =>
        row.issueTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.reporter.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRowClick = (issue) => {
        window.sessionStorage.setItem("currentIssueId", issue.id);
        setCurrentIssueId(issue.id);
        navigate(`/Project/${currentProject.projectTitle}/${issue.issueTitle}`, { state: { currentProject, issue } });
    };

    const handleActionClick = (actionName) => {
        if (actionName === '분석') {
            navigate(`/Project/${currentProject.projectTitle}/IssueAnalysis`);
        }
    };

    return (
        <Paper sx={{ width: '90%', padding: 3, margin: 'auto', maxWidth: 800 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    {currentProject.projectTitle}
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
                            onClick={() => handleActionClick(action.name)}
                        />
                    ))}
                </StyledSpeedDial>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1" gutterBottom>
                    {currentProject.projectDescription}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Reported Date: {currentProject.reportedDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Admin: {currentProject.admin}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 1, width: '100%' }}>
                <List dense>
                    {currentProject.plUser?.map((user, index) => (
                        <Chip
                            key={index}
                            avatar={<Avatar>P</Avatar>}
                            label={user}
                        />
                    ))}
                    {currentProject.devUser?.map((user, index) => (
                        <Chip
                            key={index}
                            avatar={<Avatar>D</Avatar>}
                            label={user}
                        />
                    ))}
                    {currentProject.testUser?.map((user, index) => (
                        <Chip
                            key={index}
                            avatar={<Avatar>T</Avatar>}
                            label={user}
                        />
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
                            .map((row) => (
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
                            ))}
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