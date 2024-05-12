package com.example.seproject.issue;

import com.example.seproject.project.Project;
import com.example.seproject.project.ProjectService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class IssueController {
    private final IssueService issueService;
    private final ProjectService projectService;

    @GetMapping("/api/projects/{projectId}/issues")
    public List<Issue> list(@PathVariable("projectId") Long projectId){
        Project project = projectService.getProject(projectId);
        return project.getIssueList();
    }

    @GetMapping("/api/projects/{projectId}/issues/{id}")
    public Issue detail(@PathVariable("id") Long id){
        return issueService.getIssue(id);
    }

    @PostMapping("api/projects/{projectId}/issues/create")
    public Issue create(@Valid @RequestBody IssueForm issueForm, BindingResult bindingResult, @PathVariable("projectId") Long projectId){
        if (bindingResult.hasErrors()) {
            throw new ValidationException("Validation failed");
        }
        Project project = this.projectService.getProject(projectId);
        return issueService.create(issueForm.getIssueTitle(), issueForm.getIssueDescription(),issueForm.getPriority(),issueForm.getStatus(), project);
    }
}
