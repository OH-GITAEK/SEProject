// UserContext.js
import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projectData, setProjectData] = useState({
        id: 0,
        projectTitle: "",
        projectDescription: "",
        reportedDate: "",
        admin: [{
            memberName: ""
        }],
        plUser: [{memberEmail: ""}],
        devUser: [{memberEmail: ""}],
        testUser: [{memberEmail: ""}]
    });

    return (
        <ProjectContext.Provider value={{ projectData, setProjectData }}>
            {children}
        </ProjectContext.Provider>
    );
};
