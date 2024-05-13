package com.example.seproject.issue;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class IssueForm {
    private Long id;
    private Long projectId;

    @NotEmpty(message="제목은 필수항목입니다.")
    @Size(max=200)
    private String issueTitle;

    @NotEmpty(message="내용은 필수항목입니다.")
    private String issueDescription;

    private LocalDateTime reportedDate = LocalDateTime.now();

    @Size(max=200)
    private String priority;

    @Size(max=200)
    private String status;

    public static IssueForm createIssueForm(Issue issue){
        return new IssueForm(
                issue.getId(),
                issue.getProject().getId(),
                issue.getIssueTitle(),
                issue.getIssueDescription(),
                issue.getReportedDate(),
                issue.getPriority(),
                issue.getStatus()
        );
    }
}
