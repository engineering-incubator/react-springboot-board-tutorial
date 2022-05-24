package com.example.reactspringbootboardtutorial.authentication.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.JwtException;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;

public class ExceptionHandlerFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        HashMap<String, String> responseObject = new HashMap<>();
        responseObject.put("code", "FAILURE");
        ObjectMapper mapper = new ObjectMapper();

        try {
            filterChain.doFilter(request, response);
        } catch (JwtException jwtException) {
            response.setStatus(200);
            responseObject.put("message", "JWT Token is invalid.");
            response.getWriter().println(mapper.writeValueAsString(responseObject));
        }
    }
}
