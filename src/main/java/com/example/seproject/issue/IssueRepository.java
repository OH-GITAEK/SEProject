package com.example.seproject.issue;

import org.springframework.data.jpa.repository.JpaRepository;
public interface IssueRepository extends JpaRepository<Issue,Integer> {

}