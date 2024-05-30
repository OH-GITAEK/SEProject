import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "./Usercontext";
import axios from "axios";
import PropTypes from 'prop-types'; // Tab 오류 방지
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

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
                    <Typography>{children}</Typography>
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function BasicTabs({ dailyData, monthlyData, topKeywords }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dailyChartData = {
        xAxis: [{ data: dailyData.map(item => item.date) }],
        series: [{ data: dailyData.map(item => item.count) }],
    };

    const monthlyChartData = {
        xAxis: [{ data: monthlyData.map(item => item.month) }],
        series: [{ data: monthlyData.map(item => item.count) }],
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="일별 이슈 발생 횟수" {...a11yProps(0)} />
                    <Tab label="월 별 이슈 발생 횟수" {...a11yProps(1)} />
                    <Tab label="트랜드" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <LineChart
                    xAxis={dailyChartData.xAxis}
                    series={dailyChartData.series}
                    width={500}
                    height={300}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <LineChart
                    xAxis={monthlyChartData.xAxis}
                    series={monthlyChartData.series}
                    width={500}
                    height={300}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <PieChart
                    series={[{ data: topKeywords }]}
                    width={400}
                    height={200}
                />
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
    sessionStorage.removeItem('currentIssueId'); // 현재 이슈 ID 초기화
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
            const date = new Date(issue.reportedDate).toLocaleDateString();
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
            const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
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
            issue.keyword.forEach(keyword => {
                if (keywordCount[keyword]) {
                    keywordCount[keyword]++;
                } else {
                    keywordCount[keyword] = 1;
                }
            });
        });
        const sortedKeywords = Object.entries(keywordCount).sort((a, b) => b[1] - a[1]);
        return sortedKeywords.slice(0, 5).map(([keyword, count]) => ({ id: keyword, value: count, label: keyword }));
    };

    const dailyCount = getDailyIssueCount();
    const monthlyCount = getMonthlyIssueCount();
    const topKeywords = getTopKeywords();

    return (
        <Box sx={{ width: '100%' }}>
            <BasicTabs
                dailyData={Object.entries(dailyCount).map(([date, count]) => ({ date, count }))}
                monthlyData={Object.entries(monthlyCount).map(([month, count]) => ({ month, count }))}
                topKeywords={topKeywords}
            />
        </Box>
    );
}
