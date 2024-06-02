package com.example.seproject.member.entity;

import com.example.seproject.member.dto.MemberDTO;
import com.example.seproject.project.Project;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
//database에 해당 이름의 테이블 생성
public class MemberEntity { // table 역할
    // jpa==> database를 객체처럼 사용 가능

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment 지정
    private Long id;

    @Column(unique = true) // unique 제약조건 추가
    private String memberEmail;

    @Column
    private String memberPassword;

    @Column
    private String memberName;

    public static MemberEntity toMemberEntity(MemberDTO memberDTO){
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setMemberEmail(memberDTO.getMemberEmail());
        memberEntity.setMemberPassword(memberDTO.getMemberPassword());
        memberEntity.setMemberName(memberDTO.getMemberName());
        return memberEntity;
    }
    public static MemberEntity toUpdateMemberEntity(MemberDTO memberDTO){
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setId(memberDTO.getId());
        memberEntity.setMemberEmail(memberDTO.getMemberEmail());
        memberEntity.setMemberPassword(memberDTO.getMemberPassword());
        memberEntity.setMemberName(memberDTO.getMemberName());
        return memberEntity;
    }
    // equals와 hashCode 메서드 구현
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MemberEntity that = (MemberEntity) o;
        return Objects.equals(id, that.id) && Objects.equals(memberName, that.memberName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, memberName);
    }
//    @OneToMany(mappedBy = "admin")
//    private List<Project> managedProjects;
//
//    @ManyToOne
//    @JoinColumn(name = "project_pluser_id")
//    private Project projectPlUser;
//
//    @ManyToOne
//    @JoinColumn(name = "project_devuser_id")
//    private Project projectDevUser;
//
//    @ManyToOne
//    @JoinColumn(name = "project_TestUser_id")
//    private Project projectTestUser;
}
