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



const BoardDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { Issue } = location.state || {};


    const handleDeleteProject = () => {
        // axios.delete(`/api/projects/${Project.projectId}`)
        //     .then(() => {
        //         navigate('/Project');
        //     })
        //     .catch((error) => {
        //         console.error('Error deleting project:', error);
        //     });
    };

    if (!Issue) {
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
                    {Issue.issueTitle}
                </Typography>
                <Tooltip title="Delete">
                    <IconButton onClick={handleDeleteProject}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1" gutterBottom>
                    {Issue.issueDescription}
                </Typography>
            </Box>
        </Paper>
    );
};

export default BoardDetail;
