import './App.css';
import BoardDetail from "./Components/BoardDetail";
import {Route, Routes, useLocation} from 'react-router-dom';
import Login from "./Components/Login.js";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ErrorIcon from '@mui/icons-material/Error';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import React from "react";
import Project from "./page/Project";
import Issue from "./page/Issue";
import Test from "./Testpage/Test";
import {UserProvider} from "./Components/Usercontext";
import ProjectCreate from "./Components/ProjectCreate";
import ProjectDetail from "./Components/ProjectDetail";
import {ProjectProvider} from "./Components/Projectcontext";
import IssueCreate from "./Components/IssueCreate";
import {IssueProvider} from "./Components/Issuecontext";
import CommentCreate from "./Components/CommentCreate";

const drawerWidth = 350;

const menuItems = {
    '홈': ['/', <HomeIcon />],
    '프로젝트': ['/Project', <ErrorIcon />],
    '이슈' : ['/할당된 이슈로 찾아가게 해야함', <NotificationsIcon/>],
    '계정': ['/', <AccountCircleIcon />],
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#03C75A', // 네이버 초록색
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // 콘텐츠가 앱 바 아래에 있어야 함
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function App() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const location = useLocation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const renderBreadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter((x) => x);
        return (
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
                <Link underline="hover" key="1" sx={{ color: 'white' }} href="/">
                    Home
                </Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Typography color="textPrimary" key={to} sx={{ color: 'white' }}>
                            {value}
                        </Typography>
                    ) : (
                        <Link underline="hover" color="inherit" key={to} sx={{ color: 'white' }} href={to}>
                            {value}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        );
    };

    return (
        <div className="App">
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }}>
                            {renderBreadcrumbs()}
                        </Box>
                        <Typography variant="h6" noWrap component="div">
                            Team 5
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#f5f5f5', // 연한 회색 배경색
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <UserProvider>
                        <Login />
                    </UserProvider>
                    <Divider />
                    <List>
                        {Object.entries(menuItems).map(([text, icon], index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {icon[1]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexGrow: 1,
                        padding: theme.spacing(5),
                    }}>
                        <IssueProvider>
                        <ProjectProvider>
                        <UserProvider>
                            <Routes>
                                <Route path="/Project" element={<Project/>} />
                                <Route path="/ProjectCreate" element={<ProjectCreate/>} />
                                <Route path="/Project/:projectTitle" element={<ProjectDetail />} />
                                <Route path="/Project/:projectTitle/IssueCreate" element={<IssueCreate />} />
                                <Route path="/Project/:projectTitle/:issueTitle" element={<BoardDetail/>} />
                                <Route path="/Project/:projectTitle/:issueTitle/CommentCreate" element={<CommentCreate/>} />
                                <Route path="/Testpage/Test" element={<Test />} />
                            </Routes>
                        </UserProvider>
                        </ProjectProvider>
                        </IssueProvider>
                    </Box>
                </Main>
            </Box>
        </div>
    );
}
