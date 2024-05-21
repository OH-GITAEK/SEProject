import React, { createContext, useState } from 'react';
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // default 계정
    const [users, setUsers] = useState([{ email: 'admin', password: 'admin', role: 'admin' },
                                                                           { email: 'PL1', password: 'PL1', role: 'PL' },
                                                                           { email: 'dev1', password: 'dev1', role: 'dev' },
                                                                           { email: 'tester1', password: 'tester1', role: 'tester' }]);
    // 가입한 계정 저장
    const addUser = (user) => {
        axios.post('/api/member/save', {
            memberEmail: user.email,
            memberPassword: user.password,
            memberName: user.role
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        // setUsers([...users, user]);
    };

    return (
        <UserContext.Provider value={{ users, addUser}}>
            {children}
        </UserContext.Provider>
    );
};
