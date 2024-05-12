package com.example.seproject.issue;

import java.time.LocalDateTime;
import java.util.List;

import com.example.seproject.comment.Comment;
import com.example.seproject.project.Project;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200)
    private String issueTitle;

    @Column(columnDefinition = "TEXT")
    private String issueDescription;

//    private User reporter;

    private LocalDateTime reportedDate;

//    private User fixer;

//    private User Assignee;

    @Column(length = 200)
    private String priority;

    @Column(length = 200)
    private String status;

    @OneToMany(mappedBy = "issue", cascade = CascadeType.REMOVE)
    private List<Comment> commentList;

    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;

    public Issue(Long id, String issueTitle, String issueDescription, String priority, String status, Project project) {
        this.id = id;
        this.issueTitle = issueTitle;
        this.issueDescription = issueDescription;
        this.reportedDate = LocalDateTime.now();
        this.priority = priority;
        this.status = status;
        this.project = project;
    }

    public static Issue createIssue(IssueForm issueForm, Project project) {
        // 예외 발생
        if (issueForm.getId() != null)
            throw new IllegalArgumentException("이슈 생성 실패! 이슈의 id가 없어야 합니다.");
        if (issueForm.getProjectId() != project.getId())
            throw new IllegalArgumentException("댓글 생성 실패! 프로젝트의 id가 잘못됐습니다.");

        return new Issue(
                issueForm.getId(),
                issueForm.getIssueTitle(),
                issueForm.getIssueDescription(),
                issueForm.getPriority(),
                issueForm.getStatus(),
                project
        );
    }
}
