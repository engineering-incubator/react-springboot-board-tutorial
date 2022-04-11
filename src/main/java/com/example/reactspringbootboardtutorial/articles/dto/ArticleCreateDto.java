package com.example.reactspringbootboardtutorial.articles.dto;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class ArticleCreateDto {
  @NotBlank(message = "게시물 제목은 필수 입력사항입니다.")
  @Length(min = 5, message = "게시물 제목은 최소 5자입니다.")
  private String title;

  @NotBlank(message = "게시물 내용은 필수 입력사항입니다.")
  private String content;
}
