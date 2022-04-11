package com.example.reactspringbootboardtutorial.article.controller;

import com.example.reactspringbootboardtutorial.article.dto.ArticleCreateDto;
import com.example.reactspringbootboardtutorial.article.dto.ArticleDetailsDto;
import com.example.reactspringbootboardtutorial.article.dto.ArticlesRequestDto;
import com.example.reactspringbootboardtutorial.article.service.ArticleService;
import com.example.reactspringbootboardtutorial.common.dto.PageableDto;
import com.example.reactspringbootboardtutorial.common.dto.WrappedResponseDto;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/articles")
public class ArticleController {
  private final ArticleService articleService;

  @GetMapping
  public WrappedResponseDto<PageableDto<ArticleDetailsDto>> getArticleList(@ModelAttribute ArticlesRequestDto dto) {
    return WrappedResponseDto.success(articleService.getArticleList(dto));
  }

  @GetMapping("/{articleId}")
  public WrappedResponseDto<ArticleDetailsDto> getArticle(@PathVariable Long articleId) {
    return WrappedResponseDto.success(articleService.getArticle(articleId));
  }

  @PostMapping
  public WrappedResponseDto<ArticleDetailsDto> createArticle(@Valid @RequestBody ArticleCreateDto articleCreateDto) {
    HttpServletRequest req = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    String author_ip = req.getHeader("X-FORWARDED-FOR");

    if (author_ip == null)
      author_ip = req.getRemoteAddr();

    return WrappedResponseDto.success(articleService.saveArticle(articleCreateDto, author_ip));
  }

  @DeleteMapping("/{articleId}")
  public WrappedResponseDto deleteArticle(@PathVariable Long articleId) {
    articleService.deleteArticle(articleId);
    return WrappedResponseDto.success(null);
  }

  @PutMapping("/{articleId}")
  public WrappedResponseDto<ArticleDetailsDto> updateArticle(@PathVariable Long articleId, @Valid @RequestBody ArticleCreateDto articleUpdateDto) {
    return WrappedResponseDto.success(articleService.updateArticle(articleId, articleUpdateDto));
  }
}
