package com.example.seproject.issue;

import java.util.List;
import java.time.LocalDateTime;

import com.example.seproject.project.Project;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class IssueService {
    private final IssueRepository issueRepository;

    public List<Issue> getList() {
        return issueRepository.findAll();
    }

    public Issue getIssue(Long id) {
        return issueRepository.findById(id).orElse(null);
    }

    public Issue create(String issueTitle, String issueDescription, String priority, String status, Project project) {
        Issue q = new Issue();
        q.setIssueTitle(issueTitle);
        q.setIssueDescription(issueDescription);
        q.setReportedDate(LocalDateTime.now());
        q.setPriority(priority);
        q.setStatus(status);
        q.setProject(project);
        return issueRepository.save(q);
    }
}
