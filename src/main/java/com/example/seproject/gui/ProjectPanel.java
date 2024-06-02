package com.example.seproject.gui;

import com.example.seproject.member.dto.MemberDTO;
import com.example.seproject.member.entity.MemberEntity;
import com.example.seproject.member.service.MemberService;
import com.example.seproject.project.Project;
import com.example.seproject.project.ProjectCreateForm;
import com.example.seproject.project.ProjectForm;
import com.example.seproject.project.ProjectService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

public class ProjectPanel extends JPanel {
    private final ProjectService projectService;
    private final MemberService memberService;

    private JTable projectTable;
    private DefaultTableModel projectTableModel;

    public ProjectPanel(ProjectService projectService, MemberService memberService) {
        this.projectService = projectService;
        this.memberService = memberService;
        setLayout(null);

        JButton createProjectButton = new JButton("프로젝트 생성");
        createProjectButton.setBounds(50, 50, 400, 30);
        add(createProjectButton);

        JButton getAllProjectsButton = new JButton("모든 프로젝트 조회");
        getAllProjectsButton.setBounds(50, 100, 400, 30);
        add(getAllProjectsButton);

        JButton getProjectByIdButton = new JButton("특정 프로젝트 조회");
        getProjectByIdButton.setBounds(50, 150, 400, 30);
        add(getProjectByIdButton);

        createProjectButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                createProject();
            }
        });

        getAllProjectsButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                updateProjectTable();
            }
        });

        getProjectByIdButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String projectIdStr = JOptionPane.showInputDialog("Enter Project ID:");
                if (projectIdStr != null && !projectIdStr.isEmpty()) {
                    try {
                        Long projectId = Long.parseLong(projectIdStr);
                        getProjectById(projectId);
                    } catch (NumberFormatException ex) {
                        JOptionPane.showMessageDialog(null, "Invalid Project ID format");
                    }
                }
            }
        });

        // 프로젝트 테이블
        projectTableModel = new DefaultTableModel(new Object[]{"ID", "Title", "Description", "Admin", "Reported Date"}, 0);
        projectTable = new JTable(projectTableModel);
        JScrollPane scrollPane = new JScrollPane(projectTable);
        scrollPane.setBounds(500, 50, 600, 300);
        add(scrollPane);
    }

    private void createProject() {
        MemberDTO currentUser = AppState.getInstance().getCurrentUser();
        if (currentUser == null) {
            JOptionPane.showMessageDialog(null, "로그인이 필요합니다.");
            return;
        }

        String projectTitle = JOptionPane.showInputDialog("Enter Project Title:");
        String projectDescription = JOptionPane.showInputDialog("Enter Project Description:");

        // 현재 로그인된 사용자 정보를 통해 MemberEntity 검색
        MemberEntity admin = memberService.findByMemberName(currentUser.getMemberName());

        // PL, DEV, TEST 사용자 목록을 쉼표로 구분하여 입력받아 처리
        List<MemberEntity> plUser = getUserEntitiesFromInput("Enter PL User Names (comma separated):");
        List<MemberEntity> devUser = getUserEntitiesFromInput("Enter DEV User Names (comma separated):");
        List<MemberEntity> testUser = getUserEntitiesFromInput("Enter TEST User Names (comma separated):");

        if (projectTitle != null && projectDescription != null && admin != null) {
            // 프로젝트 생성 폼 작성
            ProjectCreateForm projectCreateForm = new ProjectCreateForm();
            projectCreateForm.setProjectTitle(projectTitle);
            projectCreateForm.setProjectDescription(projectDescription);
            projectCreateForm.setAdmin(admin);
            projectCreateForm.setPlUser(plUser);
            projectCreateForm.setDevUser(devUser);
            projectCreateForm.setTestUser(testUser);

            // 프로젝트 생성
            projectService.create(projectCreateForm);
            updateProjectTable();
        }
    }


    private List<MemberEntity> getUserEntitiesFromInput(String message) {
        String userInput = JOptionPane.showInputDialog(message);
        if (userInput != null && !userInput.isEmpty()) {
            return List.of(userInput.split(","))
                    .stream()
                    .map(name -> {
                        try {
                            return memberService.findByMemberName(name.trim());
                        } catch (NoSuchElementException e) {
                            return null;
                        }
                    })
                    .filter(member -> member != null)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    private void updateProjectTable() {
        projectTableModel.setRowCount(0); // 기존 데이터를 모두 지움
        List<Project> projects = projectService.getList();
        for (Project project : projects) {
            projectTableModel.addRow(new Object[]{
                    project.getId(),
                    project.getProjectTitle(),
                    project.getProjectDescription(),
                    project.getAdmin().getMemberName(),
                    project.getReportedDate()
            });
        }
    }

    private void getProjectById(Long projectId) {
        ProjectForm projectForm = projectService.getProject(projectId);
        if (projectForm != null) {
            JOptionPane.showMessageDialog(null, "ID: " + projectForm.getId() + "\n"
                    + "Title: " + projectForm.getProjectTitle() + "\n"
                    + "Description: " + projectForm.getProjectDescription() + "\n"
                    + "Admin: " + projectForm.getAdmin() + "\n"
                    + "Reported Date: " + projectForm.getReportedDate() + "\n"
                    + "PL Users: " + String.join(", ", projectForm.getPlUser()) + "\n"
                    + "Dev Users: " + String.join(", ", projectForm.getDevUser()) + "\n"
                    + "Test Users: " + String.join(", ", projectForm.getTestUser()));
        } else {
            JOptionPane.showMessageDialog(null, "Project not found");
        }
    }
}
