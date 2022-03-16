package com.example.reactspringbootboardtutorial.article.dto;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class ArticleCreateDto {
  @NotBlank
  @Length(min = 5)
  private String title;

  @NotBlank
  private String content;
}
