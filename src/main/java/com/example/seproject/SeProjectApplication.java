package com.example.seproject;

import com.example.seproject.comment.CommentService;
import com.example.seproject.gui.CommentPanel;
import com.example.seproject.gui.IssuePanel;
import com.example.seproject.gui.MemberPanel;
import com.example.seproject.gui.ProjectPanel;
import com.example.seproject.issue.IssueService;
import com.example.seproject.member.service.MemberService;
import com.example.seproject.project.ProjectService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import javax.swing.*;
import java.awt.*;

@SpringBootApplication
public class SeProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(SeProjectApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return args -> {
            MemberService memberService = ctx.getBean(MemberService.class);
            ProjectService projectService = ctx.getBean(ProjectService.class);
            IssueService issueService = ctx.getBean(IssueService.class);
            CommentService commentService = ctx.getBean(CommentService.class);

            // JFrame 생성
            JFrame frame = new JFrame("API Client");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(1200, 800);

            // JTabbedPane 생성
            JTabbedPane tabbedPane = new JTabbedPane();

            // MemberPanel 생성 및 추가
            MemberPanel memberPanel = new MemberPanel(memberService);
            tabbedPane.addTab("Members", memberPanel);

            // ProjectPanel 생성 및 추가
            ProjectPanel projectPanel = new ProjectPanel(projectService, memberService);
            tabbedPane.addTab("Projects", projectPanel);

            // IssuePanel 생성 및 추가
            IssuePanel issuePanel = new IssuePanel(issueService, projectService, memberService);
            tabbedPane.addTab("Issues", issuePanel);

            // CommentPanel 생성 및 추가
            CommentPanel commentPanel = new CommentPanel(commentService, memberService);
            tabbedPane.addTab("Comments", commentPanel);

            // 탭 패널을 프레임에 추가
            frame.add(tabbedPane, BorderLayout.CENTER);

            // 프레임을 화면에 표시
            frame.setVisible(true);
        };
    }
}
