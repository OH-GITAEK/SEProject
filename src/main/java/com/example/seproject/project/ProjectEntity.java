package com.example.seproject.project;

import java.time.LocalDateTime;
import java.util.List;

import com.example.seproject.issue.IssueEntity;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 200)
    private String projectTitle;

    @Column(columnDefinition = "TEXT")
    private String projectDescription;

//    private User admin;

    private LocalDateTime reportedDate;

//    private User PLUser;

//    private User devUser;

//    private User testUser;

    @OneToMany(mappedBy = "project", cascade = CascadeType.REMOVE)
    private List<IssueEntity> issueList;
}
