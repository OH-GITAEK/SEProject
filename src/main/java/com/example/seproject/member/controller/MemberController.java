package com.example.seproject.member.controller;

import com.example.seproject.member.dto.MemberDTO;
import com.example.seproject.member.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/member/login")
    public String loginForm(){
        return "login";
    }

    @PostMapping("/member/login") // login.html에서 요청한 걸 받아주는 메서드
    public String login(@ModelAttribute MemberDTO memberDTO, HttpSession session){
        MemberDTO loginResult=memberService.login(memberDTO);
        if(loginResult!=null){
            // login 성공
            session.setAttribute("loginEmail",loginResult.getMemberEmail());
            return "main";
        }
        else{
            return "login";
        }
    }

    @GetMapping("/member/")
    public String findAll(Model model){
        List<MemberDTO> memberDTOList=memberService.findAll();
        // 어떠한 html로 가져갈 데이터가 있다면 model 사용
        model.addAttribute("memberList",memberDTOList);
        return "list";
    }

    @GetMapping("/member/{id}") // 경로 상에 있는 값을 다음과 같이 담아온다라는 의미
    public String findById(@PathVariable Long id,Model model){
        MemberDTO memberDTO=memberService.findById(id);
        model.addAttribute("member",memberDTO);
        return "detail";
        // detail이라는 html로 가져간다.
    }

    @GetMapping("/member/update")
    public String updateForm(HttpSession session,Model model){
        String myEmail = (String)session.getAttribute("loginEmail");
        MemberDTO memberDTO=memberService.updateForm(myEmail);
        model.addAttribute("updateMember",memberDTO);
        return "index";
    }

    @GetMapping("/member/delete/{id}")
    public String deleteById(@PathVariable Long id){
        memberService.deleteById(id);
        return "redirect:/member/";
    }

    @GetMapping("/member/logout")
    public String logout(HttpSession session){
        session.invalidate();
        return "index";
    }



}
