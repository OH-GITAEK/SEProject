package com.example.seproject;

import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.seproject.comment.Comment;
import com.example.seproject.comment.CommentRepository;
import com.example.seproject.issue.Issue;
import com.example.seproject.issue.IssueRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Optional;

@SpringBootTest
public class CommentTests {
//    @Autowired
//    private CommentRepository commentRepository;
//
//    @Autowired
//    private IssueRepository issueRepository;
//
//    @Test
//    void testCreateComment(){
//        Optional<Issue> issue = this.issueRepository.findById(2L);
//        assertTrue(issue.isPresent());
//        Issue i = issue.get();
//
//        Comment comment1 = new Comment();
//        comment1.setComment("첫번째 코멘트 테스트 입니다");
//        comment1.setReportedDate(LocalDateTime.now());
//        comment1.setIssue(i);
//        this.commentRepository.save(comment1);
//
//        Comment comment2 = new Comment();
//        comment2.setComment("두번째 코멘트 테스트 입니다");
//        comment2.setReportedDate(LocalDateTime.now());
//        comment2.setIssue(i);
//        this.commentRepository.save(comment2);
//    }
//
//    @Test
//    void testUpdateComment(){
//        Optional<Comment> updateComment = this.commentRepository.findById(2L);
//        assertTrue(updateComment.isPresent());
//        Comment p = updateComment.get();
//        p.setComment("수정 후 코멘트");
//        this.commentRepository.save(p);
//    }
//
//    @Test
//    void testDeletecomment() {
//        Optional<Comment> deleteComment = this.commentRepository.findById(1L);
//        assertTrue(deleteComment.isPresent());
//        Comment p = deleteComment.get();
//        this.commentRepository.delete(p);
//    }
}
