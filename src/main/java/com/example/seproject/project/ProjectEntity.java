package com.example.seproject.project;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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

//    private IssueEntity issue;
}
