package com.example.seproject.project;

import com.example.seproject.issue.IssueForm;
import com.example.seproject.member.entity.MemberEntity;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Getter
@Setter
public class ProjectCreateForm {
    private Long id;

    @NotEmpty(message="제목은 필수항목입니다.")
    @Size(max=200)
    private String projectTitle;

    @NotEmpty(message="내용은 필수항목입니다.")
    private String projectDescription;

    private List<IssueForm> issueList;

    @Setter
    private MemberEntity admin;

    private LocalDateTime reportedDate;

    private List<MemberEntity> plUser;

    private List<MemberEntity> devUser;

    private List<MemberEntity> testUser;

    public ProjectCreateForm(ProjectForm projectForm,MemberEntity admin, List<MemberEntity> plUser,List<MemberEntity> devUser,List<MemberEntity> testUser) {
        this.projectTitle = projectForm.getProjectTitle();
        this.projectDescription = projectForm.getProjectDescription();
        this.reportedDate = projectForm.getReportedDate();
        this.admin = admin;
        this.plUser = plUser;
        this.devUser = devUser;
        this.testUser = testUser;
    }


    public Project toEntity(){
        return new Project(projectTitle,projectDescription,admin,plUser,devUser,testUser);
    }

    //    public static ProjectForm showProject(Project project, Long projectId){
//        if (project.getId() != projectId)
//            throw new IllegalArgumentException("프로젝트 조회 실패! 프로젝트의 id가 잘못됐습니다.");
//        return new ProjectForm(project,projectId);
//    }
}
