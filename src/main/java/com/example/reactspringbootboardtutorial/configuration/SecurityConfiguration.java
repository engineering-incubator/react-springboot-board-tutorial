package com.example.reactspringbootboardtutorial.configuration;

import com.example.reactspringbootboardtutorial.authentication.CustomLoginSuccessHandler;
import com.example.reactspringbootboardtutorial.authentication.JwtProvider;
import com.example.reactspringbootboardtutorial.authentication.filter.CustomAuthenticationFilter;
import com.example.reactspringbootboardtutorial.authentication.filter.ExceptionHandlerFilter;
import com.example.reactspringbootboardtutorial.authentication.filter.JwtAuthenticationFilter;
import com.example.reactspringbootboardtutorial.authentication.service.CustomUserDetailsService;
import com.example.reactspringbootboardtutorial.constants.Permission;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
  CustomUserDetailsService userDetailsService;

  @Bean
  public JwtProvider jwtProvider() {
    return new JwtProvider();
  }

  @Bean
  public CustomAuthenticationFilter customAuthenticationFilter() throws Exception {
    CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
    customAuthenticationFilter.setFilterProcessesUrl("/v1/authentication/sign-in");
    customAuthenticationFilter.setAuthenticationSuccessHandler(customLoginSuccessHandler());
    customAuthenticationFilter.afterPropertiesSet();
    return customAuthenticationFilter;
  }

  @Bean
  public CustomLoginSuccessHandler customLoginSuccessHandler() {
    return new CustomLoginSuccessHandler(jwtProvider());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
        .addFilterAfter(new JwtAuthenticationFilter(jwtProvider(), userDetailsService), CustomAuthenticationFilter.class)
        .addFilterBefore(new ExceptionHandlerFilter(), JwtAuthenticationFilter.class)
        .anonymous()
            .and()
        .authorizeRequests()
          .anyRequest()
            .permitAll()
        .and()
        .cors()
          .disable()
        .formLogin()
          .disable()
        .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  @Override
  public void configure(WebSecurity web) {
    web
       .ignoring()
            .antMatchers("/v1/authentication/sign-up");
  }

  @Override
  protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
    authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(userDetailsService.passwordEncoder());
  }
}
