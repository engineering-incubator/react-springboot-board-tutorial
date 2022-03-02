package com.example.reactspringbootboardtutorial.article.controller;

import com.example.reactspringbootboardtutorial.article.dto.ArticleCreateDto;
import com.example.reactspringbootboardtutorial.article.dto.ArticleDetailsDto;
import com.example.reactspringbootboardtutorial.article.service.ArticleService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/article")
public class ArticleController {
  private final ArticleService articleService;

  @GetMapping("/{articleId}")
  public ArticleDetailsDto getArticle(@PathVariable Long articleId) {
    return articleService.getArticle(articleId);
  }

  @PostMapping
  public ArticleDetailsDto createArticle(@Valid @RequestBody ArticleCreateDto articleCreateDto) {
    return articleService.saveArticle(articleCreateDto);
  }

  @DeleteMapping("/{articleId}")
  public void deleteArticle(@PathVariable Long articleId) {
    try {
      articleService.deleteArticle(articleId);
    } catch (Exception e) {
      System.err.println(e.getMessage());
    }
  }
}
