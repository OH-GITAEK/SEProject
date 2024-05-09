package com.example.seproject.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/api/projects")
    public List<Project> list(){
        return projectRepository.findAll();
    }

    @GetMapping("/api/projects/{id}")
    public Project detail(@PathVariable Integer id){
        return projectRepository.findById(id).orElse(null);
    }

}
