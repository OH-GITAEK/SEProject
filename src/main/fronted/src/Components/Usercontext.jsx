// UserContext.js
import React, {createContext, useEffect, useState} from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    /*로그인 관련*/
    const storedUserData = window.sessionStorage.getItem('userData'); // 세션스토리지에서 유저 정보 가져옴
    const [userData, setUserData] = useState(JSON.parse(storedUserData) || {})
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 확인

    useEffect(() => {
        if (!userData || Object.keys(userData).length === 0) {
            setIsLoggedIn(false);
        }
        else{
            setIsLoggedIn(true);
        }
    }, [userData]);

    /* 참조중인 프로젝트 관련 */
    const accessProjectId = window.sessionStorage.getItem('currentProjectId'); // 세션스토리지에서 프로젝트의 id
    const [currentProjectId, setCurrentProjectId] = useState(accessProjectId || null); // 사용자가 클릭한 프로젝트의 id

    /* 참조중인 이슈 관련*/
    const accessIssueId = window.sessionStorage.getItem('currentIssueId');
    const [currentIssueId,setCurrentIssueId] = useState(accessIssueId || null); // 사용자가 클릭한 이슈의 id


    /* 변수 상속 */
    return (
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn, setIsLoggedIn, currentProjectId, setCurrentProjectId, currentIssueId, setCurrentIssueId}}>
            {children}
        </UserContext.Provider>
    );
};
