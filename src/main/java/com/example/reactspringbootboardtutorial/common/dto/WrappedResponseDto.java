package com.example.reactspringbootboardtutorial.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WrappedResponseDto<T> {
  private String code;
  private T content;
  private String message;

  public static <T> WrappedResponseDto<T> success (T data) {
    return new WrappedResponseDto<>(WebResponseCode.SUCCESS.getCode(), data, "");
  }

  public static <T> WrappedResponseDto<T> failure (String errorMessage) {
    return new WrappedResponseDto<>(WebResponseCode.FAILURE.getCode(), null, errorMessage);
  }

  public static <T> WrappedResponseDto<T> failure (WebResponseCode webResponseCode, String errorMessage) {
    return new WrappedResponseDto<>(webResponseCode.getCode(), null, errorMessage);
  }

  public enum WebResponseCode {
    SUCCESS("성공하였습니다."),
    FAILURE("실패하였습니다."),
    UNAUTHORIZED("권한이 없습니다.");

    private String message;

    WebResponseCode(String message) {
      this.message = message;
    }

    public String getCode() { return this.name(); }
    public String getMessage() { return this.message; }
  }
}
