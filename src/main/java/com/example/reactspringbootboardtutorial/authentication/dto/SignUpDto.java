package com.example.reactspringbootboardtutorial.authentication.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SignUpDto {
    private Long userId;

    @Builder
    public SignUpDto(Long userId) {
        this.userId = userId;
    }
}
