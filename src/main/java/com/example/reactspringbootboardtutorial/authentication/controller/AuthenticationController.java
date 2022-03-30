package com.example.reactspringbootboardtutorial.authentication.controller;

import com.example.reactspringbootboardtutorial.authentication.dto.SignUpDto;
import com.example.reactspringbootboardtutorial.authentication.dto.SignUpRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/authentication")
@RequiredArgsConstructor
public class AuthenticationController {


    @PostMapping("/sign-up")
    public SignUpDto signUp(@RequestBody SignUpRequestDto signUpRequestDto) {
        return SignUpDto.builder().userId(1L).build();
    }

}
