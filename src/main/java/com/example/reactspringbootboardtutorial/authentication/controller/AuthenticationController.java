package com.example.reactspringbootboardtutorial.authentication.controller;

import com.example.reactspringbootboardtutorial.authentication.dto.SignUpDto;
import com.example.reactspringbootboardtutorial.authentication.dto.SignUpRequestDto;
import com.example.reactspringbootboardtutorial.authentication.service.CustomUserDetailsService;
import com.example.reactspringbootboardtutorial.common.dto.WrappedResponseDto;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/authentication")
@Slf4j
public class AuthenticationController {
    private final CustomUserDetailsService userService;

    @PostMapping("/sign-up")
    public WrappedResponseDto signUp(@RequestBody SignUpRequestDto signUpRequestDto) {
        log.info("###################################################{}", signUpRequestDto);
        userService.signUp(signUpRequestDto);
        return WrappedResponseDto.success(null);
    }

    @GetMapping("/test")
    public String test() {
        log.info("###################################################");
        return "hi";
    }

    @PostMapping("/real-test")
    public SignUpRequestDto signUpTest(@RequestBody SignUpRequestDto signUpRequestDto) {
        log.info("################# {}", signUpRequestDto);
        return signUpRequestDto;
    }
}
