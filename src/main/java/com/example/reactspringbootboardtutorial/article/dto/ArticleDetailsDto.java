package com.example.reactspringbootboardtutorial.article.dto;

import com.example.reactspringbootboardtutorial.article.model.Article;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleDetailsDto {
  private Long article_id;
  private String title;
  private String content;
  private String author;
  private String created_at;
  private String modified_at;

  public static ArticleDetailsDto of(Article article) {
    return ArticleDetailsDto.builder()
        .article_id(article.getId())
        .title(article.getTitle())
        .content(article.getContent())
        .author(article.getAuthor())
        .created_at(article.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
        .modified_at(article.getModifiedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
        .build();
  }
}
