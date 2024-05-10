package com.example.seproject.project;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getList() {
        return projectRepository.findAll();
    }

    public Project getProject(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    public Project create(String ProjectTitle, String projectDescription) {
        Project q = new Project();
        q.setProjectTitle(ProjectTitle);
        q.setProjectDescription(projectDescription);
        q.setReportedDate(LocalDateTime.now());
        return projectRepository.save(q);
    }
}
