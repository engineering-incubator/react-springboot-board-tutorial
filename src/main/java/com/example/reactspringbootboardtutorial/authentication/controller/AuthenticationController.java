package com.example.reactspringbootboardtutorial.authentication.controller;

import com.example.reactspringbootboardtutorial.authentication.dto.SignUpRequestDto;
import com.example.reactspringbootboardtutorial.authentication.service.CustomUserDetailsService;
import com.example.reactspringbootboardtutorial.common.dto.WrappedResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/authentication")
@RequiredArgsConstructor
public class AuthenticationController {
    private final CustomUserDetailsService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/sign-up")
    public WrappedResponseDto<?> signUp(@Valid @RequestBody SignUpRequestDto signUpRequestDto) {
        userService.signUp(signUpRequestDto, passwordEncoder);
        return WrappedResponseDto.success(null);
    }
}
