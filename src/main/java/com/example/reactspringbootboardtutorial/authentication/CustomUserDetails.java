package com.example.reactspringbootboardtutorial.authentication;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@NoArgsConstructor
public class CustomUserDetails implements UserDetails {
  private String username;
  private String password;
  List<GrantedAuthority> authorities;



  public CustomUserDetails(String username, String password, List<GrantedAuthority> authorities) {
    this.username = username;
    this.password = password;
    this.authorities = authorities;
  }

  public boolean isAccountNonExpired() {
    return true;
  }

  public boolean isAccountNonLocked() {
    return true;
  }

  public boolean isCredentialsNonExpired() {
    return true;
  }

  public boolean isEnabled() {
    return true;
  }
}
