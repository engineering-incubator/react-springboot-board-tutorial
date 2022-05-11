package com.example.reactspringbootboardtutorial.authentication.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.JwtException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

public class ExceptionHandlerFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> errorObject = new HashMap<>();
        errorObject.put("code", "FAILURE");

        try {
            filterChain.doFilter(request, response);
        } catch (JwtException jwtException) {
            response.setStatus(401);
            errorObject.put("message", jwtException.getMessage());
            response.getWriter().println(mapper.writeValueAsString(errorObject));
        }
    }
}
