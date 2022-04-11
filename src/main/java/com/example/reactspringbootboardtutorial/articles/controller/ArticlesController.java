package com.example.reactspringbootboardtutorial.articles.controller;

import com.example.reactspringbootboardtutorial.articles.dto.ArticleCreateDto;
import com.example.reactspringbootboardtutorial.articles.dto.ArticleDetailsDto;
import com.example.reactspringbootboardtutorial.articles.service.ArticlesService;
import com.example.reactspringbootboardtutorial.common.dto.WrappedResponseDto;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/articles")
public class ArticlesController {
  private final ArticlesService articlesService;

  @GetMapping
  public WrappedResponseDto<List<ArticleDetailsDto>> getArticleList() {
    return WrappedResponseDto.success(articlesService.getArticleList());
  }

  @GetMapping("/{articleId}")
  public WrappedResponseDto<ArticleDetailsDto> getArticle(@PathVariable Long articleId) {
    return WrappedResponseDto.success(articlesService.getArticle(articleId));
  }

  @PostMapping
  public WrappedResponseDto<ArticleDetailsDto> createArticle(@Valid @RequestBody ArticleCreateDto articleCreateDto) {
    return WrappedResponseDto.success(articlesService.saveArticle(articleCreateDto));
  }

  @DeleteMapping("/{articleId}")
  public void deleteArticle(@PathVariable Long articleId) {
      articlesService.deleteArticle(articleId);
  }

  @PutMapping("/{articleId}")
  public WrappedResponseDto<ArticleDetailsDto> updateArticle(@PathVariable Long articleId, @Valid @RequestBody ArticleCreateDto articleUpdateDto) {
    return WrappedResponseDto.success(articlesService.updateArticle(articleId, articleUpdateDto));
  }
}
