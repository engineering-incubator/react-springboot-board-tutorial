package com.example.reactspringbootboardtutorial.authentication.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class SignInRequestDto {
    @NotEmpty(message="아이디는 빈 값일 수 없습니다.")
    private String username;

    @NotEmpty(message="패스워드는 빈 값일 수 없습니다.")
    private String password;
}
