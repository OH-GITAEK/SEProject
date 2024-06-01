import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "./Usercontext";
import axios from "axios";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

// CustomTabPanel: 각 탭의 내용을 렌더링하기 위한 컴포넌트
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

// a11yProps 함수: 탭 접근성을 위해 각 탭에 고유한 ID와 aria-controls 속성을 부여
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// 기본 색상 배열 (파스텔톤)
const pastelColors = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
    '#E1BAFF', '#FFBAE1', '#FFBACD', '#B3E2FF', '#BAFFFD'
];

// BasicTabs: 차트를 포함한 탭을 렌더링하는 컴포넌트
function BasicTabs({ dailyData, monthlyData, topKeywords }) {
    const [value, setValue] = useState(0);

    // 탭 변경 핸들러
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // 기본 데이터 설정
    const defaultDailyData = [
        { date: '2024-05-01', count: 1 },
        { date: '2024-05-02', count: 2 },
        { date: '2024-05-03', count: 3 }
    ];

    const defaultMonthlyData = [
        { date: '2024-05', count: 5 },
        { date: '2024-06', count: 3 },
        { date: '2024-07', count: 4 }
    ];

    const defaultTopKeywords = [
        { id: 'a', value: 10, label: '스프링' },
        { id: 'b', value: 2, label: '리액트' },
        { id: 'c', value: 5, label: '소프트웨어공학' }
    ];

    // 데이터가 비어있을 경우 기본값 사용
    const effectiveDailyData = dailyData.length > 0 ? dailyData : defaultDailyData;
    const effectiveMonthlyData = monthlyData.length > 0 ? monthlyData : defaultMonthlyData;
    const effectiveTopKeywords = topKeywords.length > 0 ? topKeywords : defaultTopKeywords;

    const valueFormatter = (value) => `${value}회`;

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" color='success' sx={{
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#03C75A',
                    },
                    '& .MuiTab-root': {
                        color: 'rgba(0, 0, 0, 0.54)', // 기본 탭 색상
                    },
                    '& .Mui-selected': {
                        color: '#009000', // 선택된 탭 색상
                    },
                }}>
                    <Tab label="일 별 이슈 발생 횟수" {...a11yProps(0)} />
                    <Tab label="월 별 이슈 발생 횟수" {...a11yProps(1)} />
                    <Tab label="트랜드" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BarChart
                        dataset={effectiveDailyData}
                        xAxis={[{ scaleType: 'band', dataKey: 'date'}]}
                        series={[{ dataKey: 'count', valueFormatter }]}
                        width={700}
                        height={500}
                    />
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BarChart
                        dataset={effectiveMonthlyData}
                        xAxis={[{ scaleType: 'band', dataKey: 'date'}]}
                        series={[{ dataKey: 'count', valueFormatter }]}
                        width={700}
                        height={500}
                    />
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <PieChart
                        series={[
                            { data: effectiveTopKeywords.map((item, index) => ({ ...item, color: pastelColors[index % pastelColors.length] })) }
                        ]}
                        width={600}
                        height={350}
                    />
                </Box>
            </CustomTabPanel>
        </Box>
    );
}

BasicTabs.propTypes = {
    dailyData: PropTypes.array.isRequired,
    monthlyData: PropTypes.array.isRequired,
    topKeywords: PropTypes.array.isRequired,
};

export default function IssueAnalysis() {
    const { currentProjectId } = useContext(UserContext); // UserContext로부터 프로젝트 ID 가져옴
    const [currentProject, setCurrentProject] = useState({}); // 현재 프로젝트 상태 관리
    const [issues, setIssues] = useState([]); // 이슈 데이터 상태 관리

    // 프로젝트 ID 변경 시 프로젝트 데이터 가져오기
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
    }, [currentProjectId]);

    // 프로젝트 변경 시 이슈 데이터 가져오기
    useEffect(() => {
        if (currentProject && currentProject.id) {
            axios.get(`/api/projects/${currentProject.id}/issues`)
                .then((response) => {
                    setIssues(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [currentProject]);

    // 일별 이슈 발생 횟수 계산
    const getDailyIssueCount = () => {
        const dailyCount = {};
        issues.forEach(issue => {
            const date = new Date(issue.reportedDate).toLocaleDateString(); // 날짜를 문자열로 변환
            if (dailyCount[date]) {
                dailyCount[date]++;
            } else {
                dailyCount[date] = 1;
            }
        });
        return dailyCount;
    };

    // 월별 이슈 발생 횟수 계산
    const getMonthlyIssueCount = () => {
        const monthlyCount = {};
        issues.forEach(issue => {
            const date = new Date(issue.reportedDate);
            const month = `${date.getFullYear()}-${date.getMonth() + 1}`; // 연도와 월을 문자열로 변환
            if (monthlyCount[month]) {
                monthlyCount[month]++;
            } else {
                monthlyCount[month] = 1;
            }
        });
        return monthlyCount;
    };

    // 키워드 발생 횟수 상위 5개 계산
    const getTopKeywords = () => {
        const keywordCount = {};
        issues.forEach(issue => {
            if (issue.keyWords) {
                issue.keyWords.forEach(keyword => {
                    if (keywordCount[keyword]) {
                        keywordCount[keyword]++;
                    } else {
                        keywordCount[keyword] = 1;
                    }
                });
            }
        });
        const sortedKeywords = Object.entries(keywordCount).sort((a, b) => b[1] - a[1]);
        return sortedKeywords.slice(0, 5).map(([keyword, count]) => ({ id: keyword, value: count, label: keyword }));
    };

    const dailyCount = getDailyIssueCount();
    const monthlyCount = getMonthlyIssueCount();
    const topKeywords = getTopKeywords();

    return (
        <Box sx={{ width: '100%', padding: '20px', backgroundColor: '#f9f9f9' }}>
            <Typography variant="h4" gutterBottom>{currentProject.projectTitle}'s Issue Analysis</Typography>
            <BasicTabs
                dailyData={Object.entries(dailyCount).map(([date, count]) => ({ date, count }))}
                monthlyData={Object.entries(monthlyCount).map(([month, count]) => ({ date: month, count }))}
                topKeywords={topKeywords}
            />
        </Box>
    );
}
