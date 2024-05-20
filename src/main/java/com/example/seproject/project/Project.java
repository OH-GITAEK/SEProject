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

    @ManyToOne
    private MemberEntity admin;

    private LocalDateTime reportedDate;

    @ManyToMany
    private List<MemberEntity> plUser;

    @ManyToMany
    private List<MemberEntity> devUser;

    @ManyToMany
    private List<MemberEntity> testUser;

//    @OneToMany(mappedBy = "project", cascade = CascadeType.REMOVE)
//    private List<Issue> issueList;

    public Project(String projectTitle, String projectDescription, MemberEntity admin,List<MemberEntity> pLUser,List<MemberEntity> devUser ,  List<MemberEntity> testUser){
        this.projectTitle = projectTitle;
        this.projectDescription = projectDescription;
        this.reportedDate = LocalDateTime.now();
        this.admin = admin;
        this.plUser = pLUser;
        this.devUser = devUser;
        this.testUser = testUser;
    }
}
