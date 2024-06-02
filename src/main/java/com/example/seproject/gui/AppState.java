package com.example.seproject.gui;

import com.example.seproject.member.dto.MemberDTO;

public class AppState {
    private static AppState instance = null;
    private MemberDTO currentUser;

    private AppState() {
        // private 생성자
    }

    public static AppState getInstance() {
        if (instance == null) {
            instance = new AppState();
        }
        return instance;
    }

    public MemberDTO getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(MemberDTO currentUser) {
        this.currentUser = currentUser;
    }
}
