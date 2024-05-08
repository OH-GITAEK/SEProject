package com.example.seproject.issue;

import java.time.LocalDateTime;
import java.util.List;

import com.example.seproject.comment.CommentEntity;
import com.example.seproject.project.ProjectEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class IssueEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 200)
    private String issueTitle;

    @Column(columnDefinition = "TEXT")
    private String issueDescription;

//    private User reporter;

    private LocalDateTime reportedDate;

//    private User fixer;

//    private User Assignee;

    @Column(length = 200)
    private String Priority;

    @Column(length = 200)
    private String Status;

    @OneToMany(mappedBy = "issue", cascade = CascadeType.REMOVE)
    private List<CommentEntity> commentList;

    @ManyToOne
    private ProjectEntity project;
}
