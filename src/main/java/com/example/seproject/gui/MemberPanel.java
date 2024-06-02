package com.example.seproject.gui;

import com.example.seproject.member.dto.MemberDTO;
import com.example.seproject.member.service.MemberService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;

public class MemberPanel extends JPanel {
    private final MemberService memberService;

    private JTable memberTable;
    private DefaultTableModel memberTableModel;

    public MemberPanel(MemberService memberService) {
        this.memberService = memberService;
        setLayout(null);

        JButton signupButton = new JButton("회원가입");
        signupButton.setBounds(50, 50, 400, 30);
        add(signupButton);

        JButton loginButton = new JButton("로그인");
        loginButton.setBounds(50, 100, 400, 30);
        add(loginButton);

        JButton getAllMembersButton = new JButton("모든 멤버 조회");
        getAllMembersButton.setBounds(50, 150, 400, 30);
        add(getAllMembersButton);

        JButton getMemberByIdButton = new JButton("특정 멤버 조회");
        getMemberByIdButton.setBounds(50, 200, 400, 30);
        add(getMemberByIdButton);

        JButton updateMemberButton = new JButton("멤버 정보 수정");
        updateMemberButton.setBounds(50, 250, 400, 30);
        add(updateMemberButton);

        JButton deleteMemberButton = new JButton("멤버 삭제");
        deleteMemberButton.setBounds(50, 300, 400, 30);
        add(deleteMemberButton);

        signupButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                signupMember();
            }
        });

        loginButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                loginMember();
            }
        });

        getAllMembersButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                updateMemberTable();
            }
        });

        getMemberByIdButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String memberIdStr = JOptionPane.showInputDialog("Enter Member ID:");
                if (memberIdStr != null && !memberIdStr.isEmpty()) {
                    try {
                        Long memberId = Long.parseLong(memberIdStr);
                        getMemberById(memberId);
                    } catch (NumberFormatException ex) {
                        JOptionPane.showMessageDialog(null, "Invalid Member ID format");
                    }
                }
            }
        });

        updateMemberButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                updateMember();
            }
        });

        deleteMemberButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String memberIdStr = JOptionPane.showInputDialog("Enter Member ID to delete:");
                if (memberIdStr != null && !memberIdStr.isEmpty()) {
                    try {
                        Long memberId = Long.parseLong(memberIdStr);
                        deleteMemberById(memberId);
                    } catch (NumberFormatException ex) {
                        JOptionPane.showMessageDialog(null, "Invalid Member ID format");
                    }
                }
            }
        });

        // 멤버 테이블
        memberTableModel = new DefaultTableModel(new Object[]{"ID", "Email", "Name"}, 0);
        memberTable = new JTable(memberTableModel);
        JScrollPane scrollPane = new JScrollPane(memberTable);
        scrollPane.setBounds(500, 50, 600, 300);
        add(scrollPane);
    }

    private void signupMember() {
        String memberEmail = JOptionPane.showInputDialog("Enter Member Email:");
        String memberPassword = JOptionPane.showInputDialog("Enter Member Password:");
        String memberName = JOptionPane.showInputDialog("Enter Member Name:");

        if (memberEmail != null && memberPassword != null && memberName != null) {
            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setMemberEmail(memberEmail);
            memberDTO.setMemberPassword(memberPassword);
            memberDTO.setMemberName(memberName);

            memberService.save(memberDTO);
            JOptionPane.showMessageDialog(null, "회원가입 성공");
            updateMemberTable();
        }
    }

    private void loginMember() {
        String memberEmail = JOptionPane.showInputDialog("Enter Member Email:");
        String memberPassword = JOptionPane.showInputDialog("Enter Member Password:");

        if (memberEmail != null && memberPassword != null) {
            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setMemberEmail(memberEmail);
            memberDTO.setMemberPassword(memberPassword);

            MemberDTO loginResult = memberService.login(memberDTO);
            if (loginResult != null) {
                JOptionPane.showMessageDialog(null, "로그인 성공: " + loginResult.getMemberName() + "님 환영합니다.");
                AppState.getInstance().setCurrentUser(loginResult); // 로그인된 사용자 정보 저장
            } else {
                JOptionPane.showMessageDialog(null, "로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
            }
        }
    }


    private void updateMemberTable() {
        memberTableModel.setRowCount(0); // 기존 데이터를 모두 지움
        List<MemberDTO> members = memberService.findAll();
        for (MemberDTO member : members) {
            memberTableModel.addRow(new Object[]{
                    member.getId(),
                    member.getMemberEmail(),
                    member.getMemberName()
            });
        }
    }

    private void getMemberById(Long memberId) {
        MemberDTO memberDTO = memberService.findById(memberId);
        if (memberDTO != null) {
            JOptionPane.showMessageDialog(null, "ID: " + memberDTO.getId() + "\n"
                    + "Email: " + memberDTO.getMemberEmail() + "\n"
                    + "Name: " + memberDTO.getMemberName());
        } else {
            JOptionPane.showMessageDialog(null, "Member not found");
        }
    }

    private void updateMember() {
        String memberIdStr = JOptionPane.showInputDialog("Enter Member ID to update:");
        if (memberIdStr != null && !memberIdStr.isEmpty()) {
            try {
                Long memberId = Long.parseLong(memberIdStr);
                MemberDTO memberDTO = memberService.findById(memberId);
                if (memberDTO != null) {
                    String newEmail = JOptionPane.showInputDialog("Enter new email:", memberDTO.getMemberEmail());
                    String newPassword = JOptionPane.showInputDialog("Enter new password:", memberDTO.getMemberPassword());
                    String newName = JOptionPane.showInputDialog("Enter new name:", memberDTO.getMemberName());

                    memberDTO.setMemberEmail(newEmail);
                    memberDTO.setMemberPassword(newPassword);
                    memberDTO.setMemberName(newName);

                    memberService.update(memberDTO);
                    JOptionPane.showMessageDialog(null, "회원 정보 수정 성공");
                    updateMemberTable();
                } else {
                    JOptionPane.showMessageDialog(null, "Member not found");
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(null, "Invalid Member ID format");
            }
        }
    }

    private void deleteMemberById(Long memberId) {
        memberService.deleteById(memberId);
        JOptionPane.showMessageDialog(null, "회원 삭제 성공");
        updateMemberTable();
    }
}