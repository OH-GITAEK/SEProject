// src/components/Home.jsx
import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';

const Home = () => {
    sessionStorage.removeItem('currentProjectId');
    sessionStorage.removeItem('currentIssueId');
    return (
        <Container sx={{ width: '100%', padding: 3, margin: 'auto', maxWidth: 1000 }}>
            <Typography variant="h1" component="div" gutterBottom sx={{textAlign: 'center'}}>
                GETTING START
            </Typography>
            <Typography variant="h4" component="div" gutterBottom sx={{textAlign: 'end'}}>
                with Team5&emsp;&emsp;&emsp;
            </Typography>
            <br/><br/>
            <Typography variant="h5" component="div" gutterBottom sx={{textAlign: 'center'}}>
                당신의 프로젝트와 이슈를 효율적으로 관리해보세요!
            </Typography>
            <br/><br/><br/>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                1.회원가입
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                계정을 만들어 당신의 프로젝트들을 관리해보세요!
                            </Typography>
                            <img
                                src="/a.png"
                                alt='loading'
                                height={500}
                                width={1000}
                            />
                        </CardContent>
                    </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" component="div">
                                2.Login
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                계정을 만드셨나요? 그럼 로그인 하세요!
                            </Typography>
                    <img
                        src="/b.png"
                        alt='loading'
                        height={500}
                        width={1000}
                    />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                3.Project&Issue 관리
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                프로젝트를 만들고 발생한 이슈를 관리해보세요.
                            </Typography>
                            <img
                                src="/c.png"
                                alt='loading'
                                height={500}
                                width={1000}
                            />
                        </CardContent>
                    </Card>
        </Container>
    );
};

export default Home;
