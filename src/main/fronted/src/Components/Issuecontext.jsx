// UserContext.js
import React, { createContext, useState } from 'react';

export const IssueContext = createContext();

export const IssueProvider = ({ children }) => {
    const [issueData, setIssueData] = useState({
        id: 0,
        projectId: 0,
        issueTitle: "string",
        issueDescription: "string",
        reporter: "string",
        fixer: "string",
        assignee: "string",
        reportedDate: "2024-05-20T09:25:54.489Z",
        priority: "string",
        status: "string"

    });

    return (
        <IssueContext.Provider value={{ issueData, setIssueData }}>
            {children}
        </IssueContext.Provider>
    );
};
