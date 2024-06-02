package com.example.seproject.gui;

import com.example.seproject.issue.IssueForm;
import com.example.seproject.issue.IssueService;
import com.example.seproject.member.service.MemberService;
import com.example.seproject.project.ProjectService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class IssuePanel extends JPanel {
    private final IssueService issueService;
    private final ProjectService projectService;
    private final MemberService memberService;

    private JTable issueTable;
    private DefaultTableModel issueTableModel;

    public IssuePanel(IssueService issueService, ProjectService projectService, MemberService memberService) {
        this.issueService = issueService;
        this.projectService = projectService;
        this.memberService = memberService;
        setLayout(null);

        JButton createIssueButton = new JButton("이슈 생성");
        createIssueButton.setBounds(50, 50, 400, 30);
        add(createIssueButton);

        JButton getAllIssuesButton = new JButton("모든 이슈 조회");
        getAllIssuesButton.setBounds(50, 100, 400, 30);
        add(getAllIssuesButton);

        JButton getIssueByIdButton = new JButton("특정 이슈 조회");
        getIssueByIdButton.setBounds(50, 150, 400, 30);
        add(getIssueByIdButton);

        JButton updateDevButton = new JButton("개발자 지정");
        updateDevButton.setBounds(50, 200, 400, 30);
        add(updateDevButton);

        JButton updateIssueButton = new JButton("이슈 업데이트");
        updateIssueButton.setBounds(50, 250, 400, 30);
        add(updateIssueButton);

        JButton recommendDevButton = new JButton("개발자 추천");
        recommendDevButton.setBounds(50, 300, 400, 30);
        add(recommendDevButton);

        createIssueButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                createIssue();
            }
        });

        getAllIssuesButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String projectIdStr = JOptionPane.showInputDialog("Enter Project ID:");
                if (projectIdStr != null && !projectIdStr.isEmpty()) {
                    try {
                        Long projectId = Long.parseLong(projectIdStr);
                        updateIssueTable(projectId);
                    } catch (NumberFormatException ex) {
                        JOptionPane.showMessageDialog(null, "Invalid Project ID format");
                    }
                }
            }
        });

        getIssueByIdButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String issueIdStr = JOptionPane.showInputDialog("Enter Issue ID:");
                if (issueIdStr != null && !issueIdStr.isEmpty()) {
                    try {
                        Long issueId = Long.parseLong(issueIdStr);
                        getIssueById(issueId);
                    } catch (NumberFormatException ex) {
                        JOptionPane.showMessageDialog(null, "Invalid Issue ID format");
                    }
                }
            }
        });

        updateDevButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                updateDev();
            }
        });

        updateIssueButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                updateIssue();
            }
        });

        recommendDevButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                recommendDevUser();
            }
        });

        // 이슈 테이블
        issueTableModel = new DefaultTableModel(new Object[]{"ID", "Title", "Description", "Reporter", "Assignee", "Status", "Keywords"}, 0);
        issueTable = new JTable(issueTableModel);
        JScrollPane scrollPane = new JScrollPane(issueTable);
        scrollPane.setBounds(500, 50, 800, 300);
        add(scrollPane);
    }

    private void createIssue() {
        String projectIdStr = JOptionPane.showInputDialog("Enter Project ID:");
        if (projectIdStr != null && !projectIdStr.isEmpty()) {
            try {
                Long projectId = Long.parseLong(projectIdStr);

                String issueTitle = JOptionPane.showInputDialog("Enter Issue Title:");
                String issueDescription = JOptionPane.showInputDialog("Enter Issue Description:");
                String reporterName = JOptionPane.showInputDialog("Enter Reporter Name:");
                String keyWords = JOptionPane.showInputDialog("Enter Keywords (comma-separated):");

                if (issueTitle != null && issueDescription != null && reporterName != null && keyWords != null) {
                    List<String> keyWordsList = Arrays.asList(keyWords.split(","));
                    IssueForm issueForm = IssueForm.builder()
                            .issueTitle(issueTitle)
                            .issueDescription(issueDescription)
                            .reporter(reporterName)
                            .keyWords(keyWordsList)
                            .build();

                    issueService.create(projectId, issueForm);
                    JOptionPane.showMessageDialog(null, "이슈 생성 성공");
                    updateIssueTable(projectId);
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(null, "Invalid Project ID format");
            }
        }
    }

    private void updateIssue() {
        String projectIdStr = JOptionPane.showInputDialog("Enter Project ID:");
        if (projectIdStr != null && !projectIdStr.isEmpty()) {
            try {
                Long projectId = Long.parseLong(projectIdStr);

                String issueIdStr = JOptionPane.showInputDialog("Enter Issue ID:");
                if (issueIdStr != null && !issueIdStr.isEmpty()) {
                    try {
                        Long issueId = Long.parseLong(issueIdStr);

                        String issueTitle = JOptionPane.showInputDialog("Enter Issue Title:");
                        String issueDescription = JOptionPane.showInputDialog("Enter Issue Description:");
                        String keyWords = JOptionPane.showInputDialog("Enter Keywords (comma-separated):");

                        if (issueTitle != null && issueDescription != null && keyWords != null) {
                            List<String> keyWordsList = Arrays.asList(keyWords.split(","));
                            IssueForm issueForm = IssueForm.builder()
                                    .issueTitle(issueTitle)
                                    .issueDescription(issueDescription)
                                    .keyWords(keyWordsList)
                                    .build();

                            issueService.update(projectId, issueId, issueForm);
                            JOptionPane.showMessageDialog(null, "이슈 업데이트 성공");
                            updateIssueTable(projectId);
                        }
                    } catch (NumberFormatException ex) {
                        JOptionPane.showMessageDialog(null, "Invalid Issue ID format");
                    }
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(null, "Invalid Project ID format");
            }
        }
    }

    private void recommendDevUser() {
        String projectIdStr = JOptionPane.showInputDialog("Enter Project ID:");
        if (projectIdStr != null && !projectIdStr.isEmpty()) {
            try {
                Long projectId = Long.parseLong(projectIdStr);

                String keyWords = JOptionPane.showInputDialog("Enter Keywords (comma-separated):");
                if (keyWords != null && !keyWords.isEmpty()) {
                    List<String> keyWordsList = Arrays.asList(keyWords.split(","));
                    List<String> recommendedDevelopers = issueService.recommendDevUsers(projectId, keyWordsList).stream()
                            .map(memberEntity -> memberEntity.getMemberName())
                            .collect(Collectors.toList());

                    StringBuilder sb = new StringBuilder("Recommended Developers:\n");
                    for (String dev : recommendedDevelopers) {
                        sb.append(dev).append("\n");
                    }
                    JOptionPane.showMessageDialog(this, sb.toString());
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(null, "Invalid Project ID format");
            }
        }
    }

    private void updateIssueTable(Long projectId) {
        issueTableModel.setRowCount(0); // 기존 데이터를 모두 지움
        List<IssueForm> issues = issueService.getList(projectId);
        for (IssueForm issue : issues) {
            issueTableModel.addRow(new Object[]{
                    issue.getId(),
                    issue.getIssueTitle(),
                    issue.getIssueDescription(),
                    issue.getReporter(),
                    issue.getAssignee(),
                    issue.getStatus(),
                    String.join(", ", issue.getKeyWords()) // 키워드 추가
            });
        }
    }

    private void getIssueById(Long issueId) {
        IssueForm issueForm = issueService.getIssue(issueId);
        if (issueForm != null) {
            JOptionPane.showMessageDialog(null, "ID: " + issueForm.getId() + "\n"
                    + "Title: " + issueForm.getIssueTitle() + "\n"
                    + "Description: " + issueForm.getIssueDescription() + "\n"
                    + "Reporter: " + issueForm.getReporter() + "\n"
                    + "Fixer: " + issueForm.getFixer() + "\n"
                    + "Assignee: " + issueForm.getAssignee() + "\n"
                    + "Status: " + issueForm.getStatus() + "\n"
                    + "Keywords: " + String.join(", ", issueForm.getKeyWords())); // 키워드 추가
        } else {
            JOptionPane.showMessageDialog(null, "Issue not found");
        }
    }

    private void updateDev() {
        String projectIdStr = JOptionPane.showInputDialog("Enter Project ID:");
        if (projectIdStr != null && !projectIdStr.isEmpty()) {
            try {
                Long projectId = Long.parseLong(projectIdStr);

                String issueIdStr = JOptionPane.showInputDialog("Enter Issue ID:");
                if (issueIdStr != null && !issueIdStr.isEmpty()) {
                    try {
                        Long issueId = Long.parseLong(issueIdStr);

                        String assigneeName = JOptionPane.showInputDialog("Enter Assignee Name:");
                        if (assigneeName != null) {
                            IssueForm issueForm = IssueForm.builder()
                                    .assignee(assigneeName)
                                    .build();

                            issueService.updateDev(projectId, issueId, issueForm, assigneeName);
                            JOptionPane.showMessageDialog(null, "개발자 지정 성공");
                            updateIssueTable(projectId);
                        }
                    } catch (NumberFormatException ex) {
                        JOptionPane.showMessageDialog(null, "Invalid Issue ID format");
                    }
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(null, "Invalid Project ID format");
            }
        }
    }
}
