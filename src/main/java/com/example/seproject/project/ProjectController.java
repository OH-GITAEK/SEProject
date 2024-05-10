package com.example.seproject.project;

import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @GetMapping("/api/projects")
    public List<Project> list(){
        return projectService.getList();
    }

    @GetMapping("/api/projects/{id}")
    public Project detail(@PathVariable Long id){
        return projectService.getProject(id);
    }

    @PostMapping("api/project/create")
    public Project create(@Valid ProjectForm projectForm, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            throw new ValidationException("Validation failed");
        }
        return projectService.create(projectForm.getProjectTitle(), projectForm.getProjectDescription());
    }
}
