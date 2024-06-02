package com.example.seproject.project;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project,Long>{
    @EntityGraph(attributePaths = {"devUser", "issues", "issues.assignee", "issues.fixer", "issues.keyWords"})
    Optional<Project> findWithDetailsById(Long id);
}
