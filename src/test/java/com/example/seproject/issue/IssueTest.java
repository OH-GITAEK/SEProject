package com.example.seproject.issue;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.seproject.member.repository.MemberRepository;
import com.example.seproject.member.service.MemberService;
import com.example.seproject.project.Project;
import com.example.seproject.project.ProjectRepository;
import com.example.seproject.member.entity.MemberEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class IssueTest {

    @Mock
    private IssueRepository issueRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private MemberService memberService;

    @InjectMocks
    private IssueService issueService;
    @InjectMocks

    private MemberEntity member;
    private Project project;


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        member = new MemberEntity();
        member.setMemberName("memberName");
        member.setMemberEmail("memberEmail");
        member.setMemberPassword("memberPassword");
        member.setId(1L);

        project = new Project("Project Title", "Project Description", member,
                Arrays.asList(member), Arrays.asList(member), Arrays.asList(member));
        project.setId(1L);
    }

    @Test
    public void testGetList() {
        Issue issue1 = new Issue();
        issue1.setIssueTitle("title1");
        issue1.setIssueDescription("description1");
        issue1.setReporter(member);
        issue1.setId(1L);
        issue1.setProject(project);

        Issue issue2 = new Issue();
        issue2.setIssueTitle("title2");
        issue2.setIssueDescription("description2");
        issue2.setReporter(member);
        issue2.setId(2L);
        issue2.setProject(project);

        when(issueRepository.findByProjectId(1L)).thenReturn(Arrays.asList(issue1, issue2));
        List<IssueForm> issues = issueService.getList(1L);

        assertEquals(2, issues.size());
    }

    @Test
    public void testGetIssue() {
        Issue issue = new Issue();
        issue.setIssueTitle("title");
        issue.setIssueDescription("description");
        issue.setReporter(member);
        issue.setId(1L);
        issue.setProject(project);
        when(issueRepository.findById(1L)).thenReturn(Optional.of(issue));

        IssueForm foundIssue = issueService.getIssue(1L);

        assertNotNull(foundIssue);
        assertEquals(1L, foundIssue.getId());
    }

    @Test
    public void testCreate() {
        List<MemberEntity> members = Arrays.asList(member);
        project.setTestUser(members);

        IssueForm form = new IssueForm();
        form.setIssueTitle("New Issue");
        form.setIssueDescription("Issue description");
        form.setReporter("memberName");
        form.setProjectId(1L);

        Issue issue = new Issue();
        issue.setIssueTitle("title");
        issue.setIssueDescription("description");
        issue.setReporter(member);
        issue.setId(1L);
        issue.setProject(project);

        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(issueRepository.save(any(Issue.class))).thenReturn(issue);
        when(memberService.findByMemberName("memberName")).thenReturn(member);

        IssueForm createdIssue = issueService.create(1L, form);

        assertNotNull(createdIssue);
    }
}
