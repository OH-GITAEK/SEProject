import React, { useState, useEffect } from 'react';
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

export default function Project() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const columns = [
        { id: 'projectTitle', label: 'Title', minWidth: 170 },
        { id: 'projectDescription', label: 'Description', minWidth: 100 },
        { id: 'reportedDate', label: 'Reported Date', minWidth: 170, align: 'right' },
        { id: 'admin', label: 'Admin', minWidth: 170, align: 'right' },
    ];

    const [rows, setRows] = useState([
        {
            id: 0,
            projectTitle: "Project0",
            projectDescription: "This is a sample project.",
            reportedDate: "2024-05-20T09:22:52.532Z",
            admin: {
                memberName: "LCW"
            },
            plUser: [{ memberEmail: "pl@example.com" }],
            devUser: [{ memberEmail: "dev@example.com" }],
            testUser: [{ memberEmail: "test@example.com" }]
        }
    ]);

    useEffect(() => {
        axios.get('/api/projects')
            .then((response) => {
                setRows((prevRows) => [...prevRows, ...response.data]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCreateProject = () => {
        navigate('/ProjectCreate');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRows = rows.filter(row =>
        row.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.projectDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.reportedDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.admin.memberName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRowClick = (Project) => {
        navigate(`/Project/${Project.projectTitle}`, { state: { Project } });
    };

    return (
        <Paper sx={{ width: '90%', margin: 'auto', overflow: 'hidden', padding: 2 }}>
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
                                                    {column.id === 'admin' ? value.memberName : value}
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
