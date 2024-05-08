package com.example.seproject;

import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.seproject.issue.Issue;
import com.example.seproject.issue.IssueRepository;
import com.example.seproject.project.Project;
import com.example.seproject.project.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Optional;
@SpringBootTest
public class IssueTests {
    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    void testCreateIssue(){
        Optional<Project> project = this.projectRepository.findById(4);
        assertTrue(project.isPresent());
        Project p =project.get();

        Issue issue1 = new Issue();
        issue1.setIssueTitle("첫번째 이슈 테스트");
        issue1.setIssueDescription("첫번째 이슈 테스트 입니다");
        issue1.setReportedDate(LocalDateTime.now());
        issue1.setProject(p);
        issue1.setPriority("major");
        issue1.setStatus("new");
        this.issueRepository.save(issue1);

        Issue issue2 = new Issue();
        issue2.setIssueTitle("두번째 이슈 테스트");
        issue2.setIssueDescription("두번째 이슈 테스트 입니다");
        issue2.setReportedDate(LocalDateTime.now());
        issue2.setProject(p);
        issue2.setPriority("major");
        issue2.setStatus("new");
        this.issueRepository.save(issue2);
    }

    @Test
    void testUpdateIssue(){
        Optional<Issue> updateIssue = this.issueRepository.findById(1);
        assertTrue(updateIssue.isPresent());
        Issue p = updateIssue.get();
        p.setIssueTitle("수정 후 제목");
        this.issueRepository.save(p);
    }

    @Test
    void testDeleteissue() {
        Optional<Issue> deleteIssue = this.issueRepository.findById(1);
        assertTrue(deleteIssue.isPresent());
        Issue p = deleteIssue.get();
        this.issueRepository.delete(p);
    }
}
