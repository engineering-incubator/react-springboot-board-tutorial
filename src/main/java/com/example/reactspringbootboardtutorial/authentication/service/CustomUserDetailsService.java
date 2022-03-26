package com.example.reactspringbootboardtutorial.authentication.service;

import com.example.reactspringbootboardtutorial.authentication.dto.SignUpRequestDto;
import com.example.reactspringbootboardtutorial.authentication.model.User;
import com.example.reactspringbootboardtutorial.authentication.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return null;
  }

  public void signUp(SignUpRequestDto signUpRequestDto) {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    signUpRequestDto.setPassword(encoder.encode(signUpRequestDto.getPassword()));

    userRepository.save(User.builder()
                            .username(signUpRequestDto.getUsername())
                            .email(signUpRequestDto.getEmail())
                            .password(signUpRequestDto.getPassword())
                            .permission(signUpRequestDto.getPermission())
                            .phoneNumber(signUpRequestDto.getPhoneNumber())
                            .build());

  }

}
