package com.example.seproject.project;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.seproject.issue.IssueForm;
import com.example.seproject.issue.IssueService;
import com.example.seproject.member.entity.MemberEntity;
import com.example.seproject.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class ProjectTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private IssueService issueService;

    @InjectMocks
    private ProjectService projectService;

    private MemberEntity member;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        member = new MemberEntity();
        member.setMemberName("memberName");
        member.setMemberEmail("memberEmail");
        member.setMemberPassword("memberPassword");
        member.setId(1L);
    }

    @Test
    public void testGetList() {
        when(projectRepository.findAll()).thenReturn(Arrays.asList(new Project(), new Project()));

        List<Project> projects = projectService.getList();

        assertEquals(2, projects.size());
    }

    @Test
    public void testGetProject() {
        List<MemberEntity> members = Arrays.asList(member);
        Project project = new Project("title", "projectDescription",member,members,members,  members);
        project.setId(1L);
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        IssueForm issueForm1 = new IssueForm();
        IssueForm issueForm2 = new IssueForm();
        when(issueService.getList(any(Long.class))).thenReturn(Arrays.asList(issueForm1, issueForm2));

        ProjectForm foundProject = projectService.getProject(1L);

        assertNotNull(foundProject);
        assertEquals(1L, foundProject.getId());
    }
    @Test
    public void testCreate() {
        List<MemberEntity> members = Arrays.asList(member);
        ProjectCreateForm form = new ProjectCreateForm();
        form.setProjectTitle("New Project");
        form.setProjectDescription("Project description");
        form.setAdmin(member);
        form.setTestUser(members);
        form.setPlUser(members);
        form.setDevUser(members);

        Project project = new Project(
                form.getProjectTitle(),
                form.getProjectDescription(),
                form.getAdmin(),
                form.getPlUser(),
                form.getDevUser(),
                form.getTestUser()
        );

        project.setId(1L);

        when(projectRepository.save(any(Project.class))).thenReturn(project);

        ProjectForm createdProject = projectService.create(form);

        assertNotNull(createdProject);
    }
}