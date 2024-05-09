package com.codingheehoon.member.controller;

import com.codingheehoon.member.dto.MemberDTO;
import com.codingheehoon.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class MemberController {
    // 생성자 주입
    private final MemberService memberService;
    //-> Controller가 memberService를 사용할 수 있게 된다.



    // 회원가입 페이지 출력 요청
    @GetMapping("/member/save")
    public String saveForm(){
        return "save"; // save라는 이름을 가진 html 파일을 template 폴더에서 찾는다.
    }

    // 링크를 클릭하는 것은 http에서 get 메서드를 사용한 요청이다.

    @PostMapping("/member/save")// save에서 요청한 걸 받아주는 메서드
    public String save(@ModelAttribute MemberDTO memberDTO){ // 전달하는 걸 받는다는 의미 name 값을 여기에 적어준다.


        System.out.println("MemberController.save");
        System.out.println("memberDTO = " + memberDTO);
        memberService.save(memberDTO);

        return "index";
    }

    @PostMapping("/member/login") // login.html에서 요청한 걸 받아주는 메서드
    public String login(@ModelAttribute MemberDTO memberDTO){
        
    }

}
