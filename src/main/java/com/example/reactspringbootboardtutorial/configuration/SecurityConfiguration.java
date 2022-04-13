package com.example.reactspringbootboardtutorial.configuration;

import com.example.reactspringbootboardtutorial.authentication.CustomLogoutSuccessHandler;
import com.example.reactspringbootboardtutorial.authentication.service.CustomUserDetailsService;
import com.example.reactspringbootboardtutorial.constants.Permission;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
  CustomUserDetailsService userDetailsService;

  @Bean
  public CustomLogoutSuccessHandler customLogoutSuccessHandler() {
    return new CustomLogoutSuccessHandler();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
          .antMatchers("/v1/authentication/**")
            .permitAll()
          .antMatchers(HttpMethod.GET, "/v1/articles")
            .permitAll()
          .antMatchers(HttpMethod.DELETE, "/v1/articles/**")
            .hasRole(Permission.ADMIN.getName())
          .anyRequest().authenticated()
        .and()
        .csrf()
          .disable()
        .cors()
          .disable()
        .formLogin()
          .disable()
        .logout()
            .logoutUrl("/v1/authentication/sign-out")
            .invalidateHttpSession(true)
            .deleteCookies("JSESSIONID")
            .logoutSuccessHandler(customLogoutSuccessHandler());
  }

  @Override
  protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
    authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(userDetailsService.passwordEncoder());
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}
