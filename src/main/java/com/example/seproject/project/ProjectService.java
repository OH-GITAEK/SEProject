package com.example.seproject.project;

import java.util.List;
import java.time.LocalDateTime;

import com.example.seproject.issue.IssueService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final IssueService issueService;

    public List<Project> getList() {
        return projectRepository.findAll();
    }

    public ProjectForm getProject(Long id) {
        Project project= projectRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("프로젝트조회 실패! " +
                "해당 프로젝트가 없습니다."));
        ProjectForm projectForm = new ProjectForm(project,id);
        projectForm.setIssueList(issueService.getList(id));
        return projectForm;
    }

    public Project create(ProjectForm projectForm) {
        Project project = projectForm.toEntity();
        if(project.getId() != null) return null;
        return projectRepository.save(project);
    }
}
