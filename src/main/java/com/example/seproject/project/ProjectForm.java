package com.example.seproject.project;

import com.example.seproject.issue.IssueForm;
import com.example.seproject.issue.IssueService;
import com.example.seproject.member.entity.MemberEntity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ProjectForm {
    private Long id;

    @NotEmpty(message="제목은 필수항목입니다.")
    @Size(max=200)
    private String projectTitle;

    @NotEmpty(message="내용은 필수항목입니다.")
    private String projectDescription;

    private List<IssueForm> issueList;

    private MemberEntity admin;

    private LocalDateTime reportedDate;

    private List<MemberEntity> PLUser;

    private List<MemberEntity> devUser;

    private List<MemberEntity> testUser;

    public ProjectForm(Project project, Long projectId) {
        this.id = projectId;
        this.projectTitle = project.getProjectTitle();
        this.projectDescription = project.getProjectDescription();
        this.reportedDate = project.getReportedDate();
        this.admin = project.getAdmin();
        this.PLUser = project.getPLUser();
        this.devUser = project.getDevUser();
        this.testUser = project.getTestUser();
    }

    public Project toEntity(){
        return new Project(id,projectTitle,projectDescription,admin,PLUser,devUser,testUser);
    }

//    public static ProjectForm showProject(Project project, Long projectId){
//        if (project.getId() != projectId)
//            throw new IllegalArgumentException("프로젝트 조회 실패! 프로젝트의 id가 잘못됐습니다.");
//        return new ProjectForm(project,projectId);
//    }
}
