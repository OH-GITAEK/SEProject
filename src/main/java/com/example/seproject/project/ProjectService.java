package com.example.seproject.project;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getList(){
        return projectRepository.findAll();
    }

    public Project getProject(Long id){
        return projectRepository.findById(id).orElse(null);
    }
}
