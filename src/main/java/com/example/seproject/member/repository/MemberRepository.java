package com.example.seproject.member.repository;

import com.example.seproject.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository  extends JpaRepository<MemberEntity,Long> {
    // 이메일로 회원 정보 조회
    // 이메일로 회원 정보 조회(select * from member_table where member_email=?)
    Optional<MemberEntity> findByMemberEmail(String memberEmail);
    // Optional: 널 방지, 옵셔널 객체로 감싸서 넘김

    Optional<MemberEntity> findByMemberName(String myMemberName);
}
