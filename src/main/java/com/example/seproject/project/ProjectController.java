package com.example.seproject.project;

import com.example.seproject.member.service.MemberService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ProjectController {
    private final ProjectService projectService;
    private final MemberService memberService;

    @GetMapping("/api/projects")
    public List<Project> list(){
        return projectService.getList();
    }

    @GetMapping("/api/projects/{id}")
    public ProjectForm detail(@PathVariable Long id){
        return projectService.getProject(id);
    }

    @PostMapping("api/projects/create")
    public ProjectForm create(@Valid @RequestBody ProjectForm projectForm, BindingResult bindingResult, HttpSession session){
        if (bindingResult.hasErrors()) {
            throw new ValidationException("Validation failed");
        }
        String myMemberName = (String)session.getAttribute("memberName");
        projectForm.setAdmin((myMemberName));
        ProjectCreateForm projectCreateForm = projectService.getCreateForm(projectForm);
        return projectService.create(projectCreateForm);
    }
}
