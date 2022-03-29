package com.example.reactspringbootboardtutorial.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
          .anyRequest()
            .permitAll()
        .and()
        .cors()
          .disable()
        .formLogin()
          .disable();
  }

  @Override
  public void configure(WebSecurity web) {
    web.ignoring().anyRequest();
  }
}
