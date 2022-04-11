package com.example.reactspringbootboardtutorial.article.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ArticleDetailsDto {
  private Long article_id;
  private String title;
  private String content;
  private String author;
  private String created_at;
  private String modified_at;

  @Builder
  public ArticleDetailsDto(Long article_id, String title, String content, String author, String created_at, String modified_at) {
    this.article_id = article_id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}