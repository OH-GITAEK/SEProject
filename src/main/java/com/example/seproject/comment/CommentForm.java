package com.example.seproject.comment;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class CommentForm {
    private Long id;
    private Long issueId;

    @NotEmpty(message="코멘트는 필수항목입니다.")
    private String content;

    private LocalDateTime reportedDate;

    public static CommentForm createCommentForm(Comment comment){
        return new CommentForm(
                comment.getId(),
                comment.getIssue().getId(),
                comment.getContent(),
                comment.getReportedDate()
        );
    }
}
