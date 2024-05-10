package com.example.seproject;

import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.seproject.project.Project;
import com.example.seproject.project.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Optional;

@SpringBootTest
public class ProjectTests {
    @Autowired
    private ProjectRepository projectRepository;

    @Test
    void testCreateProject(){
        Project project1 = new Project();
        project1.setProjectTitle("첫번째 프로젝트 테스트");
        project1.setProjectDescription("첫번째 프로젝트 테스트 입니다");
        project1.setReportedDate(LocalDateTime.now());
        this.projectRepository.save(project1);

        Project project2 = new Project();
        project2.setProjectTitle("두번째 프로젝트 테스트");
        project2.setProjectDescription("두번째 프로젝트 테스트 입니다");
        project2.setReportedDate(LocalDateTime.now());
        this.projectRepository.save(project2);
    }

    @Test
    void testUpdateProject(){
        Optional<Project> updateProject = this.projectRepository.findById(1L);
        assertTrue(updateProject.isPresent());
        Project p = updateProject.get();
        p.setProjectTitle("수정 후 제목");
        this.projectRepository.save(p);
    }

    @Test
    void testDeleteProject() {
        Optional<Project> deleteProject = this.projectRepository.findById(1L);
        assertTrue(deleteProject.isPresent());
        Project p = deleteProject.get();
        this.projectRepository.delete(p);
    }
}
