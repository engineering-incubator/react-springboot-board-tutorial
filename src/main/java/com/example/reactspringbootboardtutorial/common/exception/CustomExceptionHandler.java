package com.example.reactspringbootboardtutorial.common.exception;

import com.example.reactspringbootboardtutorial.common.dto.WrappedResponseDto;
import java.security.SignatureException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {
  @ExceptionHandler(SignatureException.class)
  public WrappedResponseDto<String> signatureException (SignatureException e) {
    return WrappedResponseDto.failure(e.getMessage());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public WrappedResponseDto<String> invalidException(MethodArgumentNotValidException e) {
    return WrappedResponseDto.failure(e.getMessage());
  }

  @ExceptionHandler(CustomException.class)
  public WrappedResponseDto<String> customException(CustomException e) {
    return WrappedResponseDto.failure(e.getMessage());
  }
}
