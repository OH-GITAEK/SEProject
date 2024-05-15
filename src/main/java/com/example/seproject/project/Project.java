package com.example.seproject.project;


import java.time.LocalDateTime;
import java.util.List;

import com.example.seproject.member.entity.MemberEntity;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200)
    private String projectTitle;

    @Column(columnDefinition = "TEXT")
    private String projectDescription;

    @OneToOne
    private MemberEntity admin;

    private LocalDateTime reportedDate;

    @OneToMany
    private List<MemberEntity> PLUser;

    @OneToMany
    private List<MemberEntity> devUser;

    @OneToMany
    private List<MemberEntity> testUser;

//    @OneToMany(mappedBy = "project", cascade = CascadeType.REMOVE)
//    private List<Issue> issueList;

    public Project(Long id, String projectTitle, String projectDescription, MemberEntity admin, List<MemberEntity> PLUser, List<MemberEntity> devUser, List<MemberEntity> testUser){
        this.id = id;
        this.projectTitle = projectTitle;
        this.projectDescription = projectDescription;
        this.reportedDate = LocalDateTime.now();
        this.admin = admin;
        this.PLUser = PLUser;
        this.devUser = devUser;
        this.testUser = testUser;
    }
}
