package com.example.reactspringbootboardtutorial.authentication.filter;

import com.example.reactspringbootboardtutorial.authentication.JwtProvider;
import com.example.reactspringbootboardtutorial.authentication.service.CustomUserDetailsService;
import io.jsonwebtoken.JwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtProvider jwtProvider, CustomUserDetailsService userDetailsService) {
        this.jwtProvider = jwtProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        String token = null;

        for (Cookie cookie : cookies) {
            System.out.println(cookie.getName());
            System.out.println(cookie.getValue());
            if (Objects.equals(cookie.getName(), "X-Auth-Token"))
                token = cookie.getValue();
        }

        if (token == null || !jwtProvider.isValid(token))
            throw new JwtException("JWT Token is invalid.");

        String username = jwtProvider.getSubject(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authRequestToken = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authRequestToken);

        filterChain.doFilter(request, response);
    }
}
