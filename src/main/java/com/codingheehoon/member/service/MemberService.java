package com.codingheehoon.member.service;

import com.codingheehoon.member.dto.MemberDTO;
import com.codingheehoon.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void save(MemberDTO memberDTO) {

    }
}
