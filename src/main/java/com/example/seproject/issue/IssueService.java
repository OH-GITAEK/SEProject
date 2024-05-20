package com.example.seproject.issue;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import com.example.seproject.member.entity.MemberEntity;
import com.example.seproject.member.service.MemberService;
import com.example.seproject.project.Project;
import com.example.seproject.project.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class IssueService {
    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;
    private final MemberService memberService;

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
        MemberEntity reporter = memberService.findByMemberName(issueForm.getReporter());

        boolean isTestUser = project.getTestUser().contains(reporter);
        if (!isTestUser) {
            try {
                throw new AccessDeniedException("Member is not authorized to create issues for this project");
            } catch (AccessDeniedException e) {
                throw new RuntimeException(e);
            }
        }
        Issue issue = Issue.createIssue(issueForm,project,reporter,null,null);
        Issue created = issueRepository.save(issue);

        return IssueForm.createIssueForm(created);
    }

    @Transactional
    public IssueForm updateDev(Long projectId, Long id,IssueForm issueForm, String myMemberName) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("이슈생성 실패! " +
                        "대상 프로젝트가 없습니다."));

        MemberEntity plUser = memberService.findByMemberName(myMemberName);

        boolean isPlUser = project.getPlUser().contains(plUser);
        if (!isPlUser) {
            try {
                throw new AccessDeniedException("Member is not authorized to create issues for this project");
            } catch (AccessDeniedException e) {
                throw new RuntimeException(e);
            }
        }
        MemberEntity assignee = memberService.findByMemberName(issueForm.getAssignee());
        Issue issue =   issueRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Issue not found"));;
        issue.setAssignee(assignee);
        Issue created = issueRepository.save(issue);

        return IssueForm.createIssueForm(created);
    }
}
