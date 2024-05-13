package com.example.seproject.member.controller;

import com.example.seproject.member.dto.MemberDTO;
import com.example.seproject.member.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member") // 기본 URL 경로를 /api/member로 설정
public class MemberApiController {
    private final MemberService memberService;

    @GetMapping("/save")
    public ResponseEntity<String> saveForm(){
        // 회원가입 페이지 대신 회원가입을 위한 안내 메시지 반환
        return ResponseEntity.ok("회원 가입 페이지 대신 사용할 안내 메시지");
    }

    @PostMapping("/save")
    public ResponseEntity<MemberDTO> save(@ModelAttribute MemberDTO memberDTO){
        memberService.save(memberDTO);
        // 회원 정보 저장 후 저장된 회원 정보 반환
        return ResponseEntity.ok(memberDTO);
    }

    @GetMapping("/login")
    public ResponseEntity<String> loginForm(){
        // 로그인 페이지 대신 로그인을 위한 안내 메시지 반환
        return ResponseEntity.ok("로그인 페이지 대신 사용할 안내 메시지");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@ModelAttribute MemberDTO memberDTO, HttpSession session){
        MemberDTO loginResult = memberService.login(memberDTO);
        if(loginResult != null){
            session.setAttribute("loginEmail", loginResult.getMemberEmail());
            return ResponseEntity.ok("메인 페이지로 리다이렉트 대신 성공 메시지");
        } else {
            return ResponseEntity.badRequest().body("로그인 실패 메시지");
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<MemberDTO>> findAll(){
        List<MemberDTO> memberDTOList = memberService.findAll();
        return ResponseEntity.ok(memberDTOList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberDTO> findById(@PathVariable Long id){
        MemberDTO memberDTO = memberService.findById(id);
        return ResponseEntity.ok(memberDTO);
    }

    @GetMapping("/update")
    public ResponseEntity<MemberDTO> updateForm(HttpSession session){
        String myEmail = (String)session.getAttribute("loginEmail");
        MemberDTO memberDTO = memberService.updateForm(myEmail);
        return ResponseEntity.ok(memberDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        memberService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session){
        session.invalidate();
        return ResponseEntity.ok().build();
    }
}
