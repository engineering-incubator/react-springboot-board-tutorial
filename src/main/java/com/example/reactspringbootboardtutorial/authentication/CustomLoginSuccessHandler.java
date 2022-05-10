package com.example.reactspringbootboardtutorial.authentication;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;

    public CustomLoginSuccessHandler(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtProvider.generateToken(userDetails);
        Cookie cookie = new Cookie("X-Auth-Token", token);
        cookie.setHttpOnly(true);
        cookie.setDomain("localhost");
        cookie.setPath("/api");

        response.addCookie(cookie);

        try {
            response.getWriter().println("{\"code\": \"SUCCESS\"}");
        } catch (IOException e) {
            throw new RuntimeException("Something wrong with writing success response when delivering cookie. WHOOOPS!?");
        }
    }
}
