package com.example.seproject.comment;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.seproject.comment.Comment;
import com.example.seproject.comment.CommentForm;
import com.example.seproject.comment.CommentService;
import com.example.seproject.comment.CommentRepository;
import com.example.seproject.issue.Issue;
import com.example.seproject.issue.IssueRepository;
import com.example.seproject.member.entity.MemberEntity;
import com.example.seproject.member.service.MemberService;
import com.example.seproject.project.Project;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class CommentTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private IssueRepository issueRepository;

    @Mock
    private MemberService memberService;

    @InjectMocks
    private CommentService commentService;

    private Project project;
    private MemberEntity member;
    private Issue issue;

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

        issue = new Issue();
        issue.setIssueTitle("title1");
        issue.setIssueDescription("description1");
        issue.setReporter(member);
        issue.setId(1L);
        issue.setProject(project);
        issue.setAssignee(member);
    }

    @Test
    public void testGetList() {
        Comment comment1 = new Comment();
        Comment comment2 = new Comment();
        comment1.setMemberEntity(member);
        comment2.setMemberEntity(member);
        comment1.setIssue(issue);
        comment2.setIssue(issue);

        when(commentRepository.findByIssueId(1L)).thenReturn(Arrays.asList(comment1, comment2));

        List<CommentForm> comments = commentService.getList(1L);

        assertEquals(2, comments.size());
    }

    @Test
    public void testGetComment() {
        Comment comment = new Comment();
        comment.setId(1L);
        comment.setIssue(issue);
        comment.setMemberEntity(member);
        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));

        CommentForm foundComment = commentService.getComment(1L);

        assertNotNull(foundComment);
        assertEquals(1L, foundComment.getId());
    }

    @Test
    public void testCreate() {
        CommentForm form = new CommentForm();
        form.setContent("New Comment");
        form.setMemberEntity("memberName");
        form.setIssueId(1L);

        Comment comment = new Comment();
        comment.setIssue(issue);
        comment.setMemberEntity(member);
        comment.setId(1L);

        when(issueRepository.findById(1L)).thenReturn(Optional.of(issue));
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(memberService.findByMemberName("memberName")).thenReturn(member);

        CommentForm createdComment = commentService.create(1L,form,"memberName");

        assertNotNull(createdComment);
    }
}
