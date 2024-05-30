package com.example.seproject.issue;

import java.time.LocalDateTime;
import java.util.List;

import com.example.seproject.comment.Comment;
import com.example.seproject.member.entity.MemberEntity;
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

    @ManyToOne
    private MemberEntity reporter;

    private LocalDateTime reportedDate;

    @ManyToOne
    private MemberEntity fixer;

    @ManyToOne
    private MemberEntity assignee;

    @Column(length = 200)
    private String priority;

    @Column(length = 200)
    private String status;

//    @OneToMany(mappedBy = "issue", cascade = CascadeType.REMOVE)
//    private List<Comment> commentList;

    @ElementCollection
    private List<String> keyWords;

    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;

    public Issue(Long id, String issueTitle, String issueDescription, String priority, String status, Project project, MemberEntity reporter,MemberEntity fixer,MemberEntity assignee,List<String> keyWords) {
        this.id = id;
        this.issueTitle = issueTitle;
        this.issueDescription = issueDescription;
        this.reportedDate = LocalDateTime.now();
        this.priority = priority;
        this.status = status;
        this.project = project;
        this.reporter = reporter;
        this.fixer = fixer;
        this.assignee = assignee;
        this.keyWords = keyWords;
    }

    public static Issue createIssue(IssueForm issueForm, Project project, MemberEntity reporter,MemberEntity fixer,MemberEntity assignee){

        return new Issue(
                issueForm.getId(),
                issueForm.getIssueTitle(),
                issueForm.getIssueDescription(),
                (issueForm.getPriority() != null && !issueForm.getPriority().isEmpty())  ? issueForm.getPriority() : "major",
                (issueForm.getStatus() != null && !issueForm.getStatus().isEmpty()) ? issueForm.getStatus() : "new",
                project,
                reporter,
                fixer,
                assignee,
                issueForm.getKeyWords()
        );
    }
}
