package com.example.seproject.issue;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue,Long> {
    //@Query(value = "SELECT * FROM comment WHERE project_id = :projectId", nativeQuery = true)
    List<Issue> findByProjectId(Long projectId);
}
