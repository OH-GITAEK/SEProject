package com.example.seproject.issue;

import com.example.seproject.member.entity.MemberEntity;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IssueForm {
    private Long id;
    private Long projectId;

    @NotEmpty(message="제목은 필수항목입니다.")
    @Size(max=200)
    private String issueTitle;

    @NotEmpty(message="내용은 필수항목입니다.")
    private String issueDescription;

    private String reporter;
    private String fixer;
    private String assignee;

    private LocalDateTime reportedDate = LocalDateTime.now();

    @Size(max=200)
    private String priority;

    @Size(max=200)
    private String status;
    private List<String> keyWords;

    public static IssueForm createIssueForm(Issue issue){
        String fixer;
        String assignee;
        if(issue.getFixer() == null){
            fixer = "";
        }
        else{
            fixer = issue.getFixer().getMemberName();
        }
        if(issue.getAssignee() == null){
            assignee = "";
        }
        else{
            assignee = issue.getAssignee().getMemberName();
        }
        return new IssueForm(
                issue.getId(),
                issue.getProject().getId(),
                issue.getIssueTitle(),
                issue.getIssueDescription(),
                issue.getReporter().getMemberName(),
                fixer,
                assignee,
                issue.getReportedDate(),
                issue.getPriority(),
                issue.getStatus(),
                issue.getKeyWords()
        );
    }
}
