package com.example.seproject.project;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import java.util.Optional;

import com.example.seproject.issue.IssueForm;
import com.example.seproject.issue.IssueService;
import com.example.seproject.member.entity.MemberEntity;
import com.example.seproject.member.repository.MemberRepository;
import com.example.seproject.member.service.MemberService;
import org.springframework.beans.factory.support.ManagedList;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final IssueService issueService;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public List<Project> getList() {
        return projectRepository.findAll();
    }

    public ProjectForm getProject(Long id) {
        Project project= projectRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("프로젝트조회 실패! " +
                "해당 프로젝트가 없습니다."));
        ProjectForm projectForm = new ProjectForm(project);
        projectForm.setIssueList(issueService.getList(id));
        return projectForm;
    }

    public ProjectForm create(ProjectCreateForm projectCreateForm) {
        Project project = projectCreateForm.toEntity();
        if(project.getId() != null) return null;
        Project created = projectRepository.save(project);
        return ProjectForm.createProjectForm(created);
    }

    public ProjectCreateForm getCreateForm(ProjectForm projectForm) {
        List<MemberEntity> PLUser = new ArrayList<>();
        if(projectForm.getPlUser()!=null){
        for (String s : projectForm.getPlUser()) {
            MemberEntity byMemberName = memberService.findByMemberName(s);
            PLUser.add(byMemberName);
        }}
        List<MemberEntity> devUser = new ArrayList<>();
        for (String s : projectForm.getDevUser()) {
            MemberEntity byMemberName = memberService.findByMemberName(s);
            devUser.add(byMemberName);
        }
        List<MemberEntity> testUser = new ArrayList<>();
        for (String s : projectForm.getTestUser()) {
            MemberEntity byMemberName = memberService.findByMemberName(s);
            testUser.add(byMemberName);
        }
        return new ProjectCreateForm(projectForm,memberService.findByMemberName(projectForm.getAdmin()), PLUser, devUser, testUser);
    }
}
