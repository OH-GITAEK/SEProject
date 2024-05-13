package com.example.seproject.comment;

import java.time.LocalDateTime;

import com.example.seproject.issue.Issue;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime reportedDate;

    //    private User fixer;

    @ManyToOne
    private Issue issue;

    public Comment(Long id, String content, Issue issue) {
        this.id = id;
        this.content = content;
        this.reportedDate = LocalDateTime.now();
        this.issue = issue;
    }

    public static Comment createComment(CommentForm commentForm, Issue issue) {
        if (commentForm.getId() != null)
            throw new IllegalArgumentException("코멘트 생성 실패! 이슈의 id가 없어야 합니다.");
        if (commentForm.getIssueId() != issue.getId())
            throw new IllegalArgumentException("코멘트 생성 실패! 이슈의 id가 잘못됐습니다.");

        return new Comment(
                commentForm.getId(),
                commentForm.getContent(),
                issue
        );
    }
}
