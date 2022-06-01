package com.example.reactspringbootboardtutorial.authentication.service;

import com.example.reactspringbootboardtutorial.authentication.CustomUserDetails;
import com.example.reactspringbootboardtutorial.authentication.dto.UserDetailsDto;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
  public UserDetailsDto getUserDetails() {
    CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    return UserDetailsDto.builder()
        .username(userDetails.getUsername())
        .permission(
            userDetails
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList())
                .get(0)
                .substring(5)
        ).build();
  }
}
