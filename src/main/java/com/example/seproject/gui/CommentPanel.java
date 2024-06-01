package com.example.seproject.gui;

import com.example.seproject.comment.CommentForm;
import com.example.seproject.comment.CommentService;
import com.example.seproject.member.dto.MemberDTO;
import com.example.seproject.member.service.MemberService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;

public class CommentPanel extends JPanel {
    private final CommentService commentService;
    private final MemberService memberService;

    private JTable commentTable;
    private DefaultTableModel commentTableModel;

    public CommentPanel(CommentService commentService, MemberService memberService) {
        this.commentService = commentService;
        this.memberService = memberService;
        setLayout(null);

        JButton createCommentButton = new JButton("댓글 생성");
        createCommentButton.setBounds(50, 50, 400, 30);
        add(createCommentButton);

        JButton getAllCommentsButton = new JButton("모든 댓글 조회");
        getAllCommentsButton.setBounds(50, 100, 400, 30);
        add(getAllCommentsButton);

        JButton getCommentByIdButton = new JButton("특정 댓글 조회");
        getCommentByIdButton.setBounds(50, 150, 400, 30);
        add(getCommentByIdButton);

        createCommentButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                createComment();
            }
        });

        getAllCommentsButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String issueIdStr = JOptionPane.showInputDialog("Enter Issue ID:");
                if (issueIdStr != null && !issueIdStr.isEmpty()) {
                    try {
                        Long issueId = Long.parseLong(issueIdStr);
                        updateCommentTable(issueId);
                    } catch (NumberFormatException ex) {
                        JOptionPane.showMessageDialog(null, "Invalid Issue ID format");
                    }
                }
            }
        });

        getCommentByIdButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String commentIdStr = JOptionPane.showInputDialog("Enter Comment ID:");
                if (commentIdStr != null && !commentIdStr.isEmpty()) {
                    try {
                        Long commentId = Long.parseLong(commentIdStr);
                        getCommentById(commentId);
                    } catch (NumberFormatException ex) {
                        JOptionPane.showMessageDialog(null, "Invalid Comment ID format");
                    }
                }
            }
        });

        // 댓글 테이블
        commentTableModel = new DefaultTableModel(new Object[]{"ID", "Content", "Reporter", "Reported Date"}, 0);
        commentTable = new JTable(commentTableModel);
        JScrollPane scrollPane = new JScrollPane(commentTable);
        scrollPane.setBounds(500, 50, 800, 300);
        add(scrollPane);
    }

    private void createComment() {
        MemberDTO currentUser = AppState.getInstance().getCurrentUser();
        if (currentUser == null) {
            JOptionPane.showMessageDialog(null, "로그인이 필요합니다.");
            return;
        }

        String issueIdStr = JOptionPane.showInputDialog("Enter Issue ID:");
        if (issueIdStr != null && !issueIdStr.isEmpty()) {
            try {
                Long issueId = Long.parseLong(issueIdStr);

                String content = JOptionPane.showInputDialog("Enter Comment Content:");

                if (content != null) {
                    CommentForm commentForm = CommentForm.builder()
                            .content(content)
                            .build();

                    commentService.create(issueId, commentForm, currentUser.getMemberName()); // 로그인된 사용자 이름 사용
                    JOptionPane.showMessageDialog(null, "댓글 생성 성공");
                    updateCommentTable(issueId);
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(null, "Invalid Issue ID format");
            }
        }
    }


    private void updateCommentTable(Long issueId) {
        commentTableModel.setRowCount(0); // 기존 데이터를 모두 지움
        List<CommentForm> comments = commentService.getList(issueId);
        for (CommentForm comment : comments) {
            commentTableModel.addRow(new Object[]{
                    comment.getId(),
                    comment.getContent(),
                    comment.getMemberEntity(),
                    comment.getReportedDate()
            });
        }
    }

    private void getCommentById(Long commentId) {
        CommentForm commentForm = commentService.getComment(commentId);
        if (commentForm != null) {
            JOptionPane.showMessageDialog(null, "ID: " + commentForm.getId() + "\n"
                    + "Content: " + commentForm.getContent() + "\n"
                    + "Reporter: " + commentForm.getMemberEntity() + "\n"
                    + "Reported Date: " + commentForm.getReportedDate());
        } else {
            JOptionPane.showMessageDialog(null, "Comment not found");
        }
    }
}
