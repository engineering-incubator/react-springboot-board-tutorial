package com.example.reactspringbootboardtutorial.articles.model;

import com.example.reactspringbootboardtutorial.common.BaseTimeEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Article extends BaseTimeEntity {
  @Id
  @Setter(AccessLevel.NONE)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(columnDefinition = "VARCHAR(100)", nullable = false)
  private String title;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String content;

  @Column(columnDefinition = "VARCHAR(50)", nullable = false)
  private String author;

  @Column(columnDefinition = "TINYINT(4)", nullable = false)
  private Boolean deleted;

  @Column(columnDefinition = "BIGINT", nullable = false)
  private Long views;
}
