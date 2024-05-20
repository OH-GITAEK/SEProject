package com.example.seproject.member.controller;

import com.example.seproject.member.dto.MemberDTO;
import com.example.seproject.member.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemberApiController {
    private final MemberService memberService;

    @PostMapping("/api/member/save")
    public MemberDTO save(@RequestBody MemberDTO memberDTO) {
        memberService.save(memberDTO);
        return memberDTO;
    }

    @PostMapping("/api/member/login")
    public MemberDTO login(@RequestBody MemberDTO memberDTO, HttpSession session) {
        MemberDTO loginResult = memberService.login(memberDTO);
        if (loginResult != null) {
            session.setAttribute("memberName", loginResult.getMemberName());
        }
        return loginResult;
    }

    @GetMapping("/api/member/")
    public List<MemberDTO> findAll() {
        return memberService.findAll();
    }

    @GetMapping("/api/member/{id}")
    public MemberDTO findById(@PathVariable Long id){
        return memberService.findById(id);
    }

    @PutMapping("/api/member/update")
    public MemberDTO updateForm(@RequestBody MemberDTO memberDTO, HttpSession session) {
        String myMemberName = (String)session.getAttribute("memberName");

        // 이 부분의 구현에 따라서 DTO를 수정한 후 저장하는 로직이 필요할 수 있습니다.
        // 예) memberDTO.setMemberName(myMemberName);
        // memberService.update(memberDTO);

        return memberDTO; // 수정된 정보를 반환합니다.
    }

    @DeleteMapping("/api/member/delete/{id}")
    public Long deleteById(@PathVariable Long id) {
        memberService.deleteById(id);
        return id;
    }

    @PostMapping("/api/member/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
