package com.example.seproject.comment;

import java.util.List;
import java.util.stream.Collectors;

import com.example.seproject.issue.Issue;
import com.example.seproject.issue.IssueForm;
import com.example.seproject.issue.IssueRepository;
import com.example.seproject.project.Project;
import com.example.seproject.project.ProjectRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final IssueRepository issueRepository;

    public List<CommentForm> getList(Long issueId){
        return commentRepository.findByIssueId(issueId).stream().map(comment-> CommentForm.createCommentForm(comment)).collect(Collectors.toList());
    }

    public CommentForm getComment(Long id){
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("코멘트조회 실패! " +
                "해당 코멘트가 없습니다."));
        return CommentForm.createCommentForm(comment);
    }

    public CommentForm create(Long issueId, CommentForm commentForm){
        Issue issue = issueRepository.findById(issueId).orElseThrow(() -> new IllegalArgumentException("프로젝트생성 실패! " +
                "대상 이슈가 없습니다."));

        Comment comment = Comment.createComment(commentForm, issue);
        Comment created = commentRepository.save(comment);

        return CommentForm.createCommentForm(created);
    }
}
