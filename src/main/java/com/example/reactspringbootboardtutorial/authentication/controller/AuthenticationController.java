package com.example.reactspringbootboardtutorial.authentication.controller;

import com.example.reactspringbootboardtutorial.authentication.dto.SignUpDto;
import com.example.reactspringbootboardtutorial.authentication.dto.SignUpRequestDto;
import com.example.reactspringbootboardtutorial.authentication.service.CustomUserDetailsService;
import com.example.reactspringbootboardtutorial.common.dto.WrappedResponseDto;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/authentication")
public class AuthenticationController {
    private final CustomUserDetailsService userService;

    @PostMapping("/sign-up")
    public WrappedResponseDto signUp(@Valid @RequestBody SignUpRequestDto signUpRequestDto) {
        userService.signUp(signUpRequestDto);
        return WrappedResponseDto.success(null);
    }
}
