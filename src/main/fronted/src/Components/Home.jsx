// src/components/Home.jsx
import React from 'react';
import { Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';

const Home = () => {
    sessionStorage.removeItem('currentProjectId');
    sessionStorage.removeItem('currentIssueId');
    return (
        <Container>
            <Typography variant="h1" component="div" gutterBottom>
                GETTING START
            </Typography>
            <Typography variant="h4" component="div" gutterBottom>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; with
                Team5
            </Typography>
            <br/><br/>
            <Typography variant="h5" component="div" gutterBottom>
                당신의 프로젝트와 이슈를 효율적으로 관리해보세요!
            </Typography>
            <br/><br/><br/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                1.회원가입
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                계정을 만들어 당신의 프로젝트들을 관리해보세요.
                            </Typography>
                            <Button variant="contained" color="success" style={{marginTop: '1em'}}>
                                회원가입
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                2.Login
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                계정을 만드셨나요? 그럼 로그인 하세요!
                            </Typography>
                            <Button variant="contained" color="success" style={{marginTop: '1em'}}>
                                로그인
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                3.Project&Issue 관리
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                프로젝트를 만들고 발생한 이슈를 관리해보세요.
                            </Typography>
                            <Button variant="contained" color="success" style={{marginTop: '1em'}}>
                                Select Project
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
