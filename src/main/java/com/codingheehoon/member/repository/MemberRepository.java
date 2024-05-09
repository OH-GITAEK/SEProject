package com.codingheehoon.member.repository;

import com.codingheehoon.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository  extends JpaRepository<MemberEntity,Long> {

}
