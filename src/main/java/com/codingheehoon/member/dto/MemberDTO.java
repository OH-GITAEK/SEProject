package com.codingheehoon.member.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MemberDTO { // 회원정보에 필요한 내용들을 필드로 정리
    private Long id;
    private String memberEmail;
    private String memberPassword;
    private String memberName;
}
