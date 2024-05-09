package com.example.seproject.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

}
