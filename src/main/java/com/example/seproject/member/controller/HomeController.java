package com.example.seproject.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    // 기본 페이지 요청 메서드
    @GetMapping("/") // 기본 주소 요청
    // 그러면 아래 함수가 호출된다.
    public String index(){
        return "index"; // => templates 폴더의 index.html를 찾아감
    }
}
