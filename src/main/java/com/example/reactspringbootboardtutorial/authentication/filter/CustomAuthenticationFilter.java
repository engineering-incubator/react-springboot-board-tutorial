package com.example.reactspringbootboardtutorial.authentication.filter;

import com.example.reactspringbootboardtutorial.authentication.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    public CustomAuthenticationFilter (AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        UsernamePasswordAuthenticationToken authRequestToken;

        try {
            User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
            authRequestToken = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
        } catch (IOException e) {
            throw new RuntimeException("입력된 정보가 없습니다.");
        }

        setDetails(request, authRequestToken);
        return this.getAuthenticationManager().authenticate(authRequestToken);
    }
}
