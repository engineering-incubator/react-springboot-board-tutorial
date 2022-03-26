package com.example.reactspringbootboardtutorial.common.exception;

import com.example.reactspringbootboardtutorial.common.dto.WrappedResponseDto;
import com.example.reactspringbootboardtutorial.common.dto.WrappedResponseDto.WebResponseCode;

public class CustomException extends RuntimeException {
  private String message = WrappedResponseDto.WebResponseCode.FAILURE.getMessage();
  private WrappedResponseDto.WebResponseCode webResponseCode = WebResponseCode.FAILURE;

  public CustomException(WebResponseCode webResponseCode) { this.webResponseCode = webResponseCode; }
  public CustomException(String message) { this.message = message; }

  public CustomException(String message, WrappedResponseDto.WebResponseCode webResponseCode) {
    this.message = message;
    this.webResponseCode = webResponseCode;
  }

  public String getMessage() { return message; }
  public WrappedResponseDto.WebResponseCode getWebResponseCode() { return webResponseCode; }
}
