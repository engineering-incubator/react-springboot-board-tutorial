package com.example.reactspringbootboardtutorial.authentication.dto;

import com.example.reactspringbootboardtutorial.constants.Permission;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequestDto {
    @Length(min=1, max=20, message = "아이디는 최소 1자, 최대 20자입니다.")
    @NotBlank(message = "아이디는 필수 입력사항입니다.")
    private String username;

    @Length(min=8, message = "비밀번호는 최소 8자 이상입니다.")
    private String password;

    @Email(message = "이메일 형식이 올바르지 않습니다.")
    @NotBlank(message = "이메일은 필수 입력사항입니다.")
    private String email;

    @NotBlank(message = "휴대전화 번호는 필수 입력사항입니다.")
    private String phoneNumber;

    @NotBlank(message = "권한은 필수 입력사항입니다.")
    private Permission permission;
}
