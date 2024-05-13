package com.example.seproject.issue;

import java.util.List;
import java.util.stream.Collectors;

import com.example.seproject.project.Project;
import com.example.seproject.project.ProjectRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class IssueService {
    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;

    public List<IssueForm> getList(Long projectId) {
        return issueRepository.findByProjectId(projectId).stream().map(issue -> IssueForm.createIssueForm(issue)).collect(Collectors.toList());
    }

    public IssueForm getIssue(Long id) {
        Issue issue = issueRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("이슈조회 실패! " +
                "해당 이슈가 없습니다."));

        return IssueForm.createIssueForm(issue);
    }

    public IssueForm create(Long projectId, IssueForm issueForm){
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("이슈생성 실패! " +
                        "대상 프로젝트가 없습니다."));
        Issue issue = Issue.createIssue(issueForm,project);
        Issue created = issueRepository.save(issue);

        return IssueForm.createIssueForm(created);
    }
}
