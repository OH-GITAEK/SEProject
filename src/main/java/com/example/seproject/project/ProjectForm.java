package com.example.seproject.project;

import com.example.seproject.issue.IssueForm;
import com.example.seproject.member.entity.MemberEntity;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Getter
@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
public class ProjectForm {
    private Long id;

    @NotEmpty(message="제목은 필수항목입니다.")
    @Size(max=200)
    private String projectTitle;

    @NotEmpty(message="내용은 필수항목입니다.")
    private String projectDescription;

   private List<IssueForm> issueList;

    @Setter
    private String admin;

    private LocalDateTime reportedDate;
    @Getter
    private List<String> plUser;
    @Getter
    private List<String> devUser;
    @Getter
    private List<String> testUser;

    public ProjectForm(Project project) {
        this.id = project.getId();
        this.projectTitle = project.getProjectTitle();
        this.projectDescription = project.getProjectDescription();
        this.reportedDate = project.getReportedDate();
        this.admin = project.getAdmin().getMemberName();
        this.plUser = project.getPlUser().stream().map(MemberEntity::getMemberName).collect(Collectors.toList());
        this.devUser = project.getDevUser().stream().map(MemberEntity::getMemberName).collect(Collectors.toList());
        this.testUser = project.getTestUser().stream().map(MemberEntity::getMemberName).collect(Collectors.toList());
    }

    public static ProjectForm createProjectForm(Project project) {
        return new ProjectForm(
                project
                );
    }


//    public Project toEntity(){
//        return new Project(id,projectTitle,projectDescription,admin);
//    }

    //    public static ProjectForm showProject(Project project, Long projectId){
//        if (project.getId() != projectId)
//            throw new IllegalArgumentException("프로젝트 조회 실패! 프로젝트의 id가 잘못됐습니다.");
//        return new ProjectForm(project,projectId);
//    }
}
