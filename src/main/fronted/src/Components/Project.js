import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import axios from 'axios';
import { UserContext } from './Usercontext';

/* 검색바 style */
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

/* 테이블 style */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
}));

export default function Project() {
    sessionStorage.removeItem('currentProjectId');
    sessionStorage.removeItem('currentIssueId');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { userData, setCurrentProjectId } = useContext(UserContext); // UserContext로부터 변수 상속
    const columns = [
        { id: 'projectTitle', label: 'Title', minWidth: 170 },
        { id: 'projectDescription', label: 'Description', minWidth: 100 },
        { id: 'reportedDate', label: 'Reported Date', minWidth: 170, align: 'right' },
        { id: 'admin', label: 'Admin', minWidth: 170, align: 'right' },
    ];

    const [rows, setRows] = useState([{
        id: 0,
        projectTitle: "",
        projectDescription: "",
        reportedDate: "",
        admin: {
            memberName: ""
        },
        plUser: [{ memberName: "" }],
        devUser: [{ memberName: "" }],
        testUser: [{ memberName: "" }]
    }]);

    /* 테이블에 project data 가져온다 */
    useEffect(() => {
        if(Object.keys(userData).length !== 0) {
            axios.get('/api/projects')
                .then((response) => {
                    setRows(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, []);

    /* 테이블에 페이지 넘기기 */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    /* 프로젝트 생성 */
    const handleCreateProject = () => {
        navigate('/Project/ProjectCreate');
    };

    /* 검색 처리 */
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRows = rows.filter(row =>
        row.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.projectDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.reportedDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.admin?.memberName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /* 프로젝트를 누르면 프로젝트의 상세로 이동 */
    const handleRowClick = (Project) => {
        window.sessionStorage.setItem("currentProjectId", Project.id);
        setCurrentProjectId(Project.id);
        navigate(`/Project/${Project.projectTitle}`);
    };

    return (
        <Paper sx={{ width: '100%', padding: 3, margin: 'auto', maxWidth: 1000 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
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
                }} onClick={handleCreateProject}>
                    Project 생성
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
                                                    {typeof value === 'object' && value !== null
                                                        ? Array.isArray(value)
                                                            ? value.map(v => v.memberName).join(', ')
                                                            : value.memberName
                                                        : value}
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
}
