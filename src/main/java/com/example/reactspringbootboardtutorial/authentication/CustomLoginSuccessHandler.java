package com.example.reactspringbootboardtutorial.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import java.io.IOException;
import java.util.HashMap;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class CustomLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;

    public CustomLoginSuccessHandler(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtProvider.generateToken(userDetails);
        HashMap<String, Object> responseObject = new HashMap<>();
        HashMap<String, Object> userInfo = new HashMap<>();
        ObjectMapper mapper = new JsonMapper();

        userInfo.put("username", userDetails.getUsername());
        userInfo.put("permission",
            userDetails.getAuthorities().stream().findFirst().isPresent() ?
                userDetails.getAuthorities().stream().findFirst().get().getAuthority() :
                null);
        responseObject.put("code", "SUCCESS");
        responseObject.put("content", userInfo);

        Cookie cookie = new Cookie("X-Auth-Token", token);
        cookie.setHttpOnly(true);
        cookie.setDomain("localhost");
        cookie.setPath("/api");

        response.addCookie(cookie);

        try {
            response.getWriter().println(mapper.writeValueAsString(responseObject));
        } catch (IOException e) {
            throw new RuntimeException("Something wrong with writing success response when delivering cookie. WHOOOPS!?");
        }
    }
}
