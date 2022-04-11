package com.example.reactspringbootboardtutorial.authentication.controller;

import com.example.reactspringbootboardtutorial.authentication.dto.SignInRequestDto;
import com.example.reactspringbootboardtutorial.authentication.dto.SignUpDto;
import com.example.reactspringbootboardtutorial.authentication.dto.SignUpRequestDto;
import com.example.reactspringbootboardtutorial.authentication.service.CustomUserDetailsService;
import com.example.reactspringbootboardtutorial.common.dto.WrappedResponseDto;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/authentication")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/sign-up")
    public WrappedResponseDto<?> signUp(@Valid @RequestBody SignUpRequestDto signUpRequestDto) {
        userService.signUp(signUpRequestDto, passwordEncoder);
        return WrappedResponseDto.success(null);
    }

    @PostMapping("/sign-in")
    public WrappedResponseDto<?> signIn(@Valid @RequestBody SignInRequestDto signInRequestDto, HttpSession session) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(signInRequestDto.getUsername(), signInRequestDto.getPassword());
        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());

        return WrappedResponseDto.success(SecurityContextHolder.getContext().getAuthentication());
    }

    @GetMapping
    public WrappedResponseDto<?> checkCredentials() {
        return WrappedResponseDto.success(SecurityContextHolder.getContext().getAuthentication());
    }
}
