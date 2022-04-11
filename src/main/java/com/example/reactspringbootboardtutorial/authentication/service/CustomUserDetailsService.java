package com.example.reactspringbootboardtutorial.authentication.service;

import com.example.reactspringbootboardtutorial.authentication.CustomUserDetails;
import com.example.reactspringbootboardtutorial.authentication.dto.SignUpRequestDto;
import com.example.reactspringbootboardtutorial.authentication.model.User;
import com.example.reactspringbootboardtutorial.authentication.repository.UserRepository;
import com.example.reactspringbootboardtutorial.common.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(username));

    Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
    grantedAuthorities.add(new SimpleGrantedAuthority(user.getPermission().getName()));
    return new CustomUserDetails(user.getUsername(), user.getPassword(), grantedAuthorities);
  }

  public void signUp(SignUpRequestDto signUpRequestDto, PasswordEncoder passwordEncoder) {
    if (userRepository.findByUsername(signUpRequestDto.getUsername()).isPresent()) {
      throw new CustomException("이미 가입된 아이디입니다.");
    }

    signUpRequestDto.setPassword(passwordEncoder.encode(signUpRequestDto.getPassword()));

    userRepository.save(User.builder()
                            .username(signUpRequestDto.getUsername())
                            .email(signUpRequestDto.getEmail())
                            .password(signUpRequestDto.getPassword())
                            .permission(signUpRequestDto.getPermission())
                            .phoneNumber(signUpRequestDto.getPhoneNumber())
                            .build());

  }

}
