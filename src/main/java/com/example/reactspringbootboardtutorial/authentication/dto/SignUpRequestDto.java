package com.example.reactspringbootboardtutorial.authentication.dto;

import com.example.reactspringbootboardtutorial.constants.Permission;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpRequestDto {
    private String loginId;
    private String password;
    private String email;
    private String phoneNumber;
    private Permission permission;
}
