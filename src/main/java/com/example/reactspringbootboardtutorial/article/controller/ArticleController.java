package com.example.reactspringbootboardtutorial.article.controller;

import com.example.reactspringbootboardtutorial.article.dto.ArticleCreateDto;
import com.example.reactspringbootboardtutorial.article.dto.ArticleDetailsDto;
import com.example.reactspringbootboardtutorial.article.service.ArticleService;
import com.example.reactspringbootboardtutorial.common.dto.WrappedResponseDto;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
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
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/articles")
public class ArticleController {
  private final ArticleService articleService;

  @GetMapping
  public WrappedResponseDto<List<ArticleDetailsDto>> getArticleList() {
    return WrappedResponseDto.success(articleService.getArticleList());
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
  public void deleteArticle(@PathVariable Long articleId) {
      articleService.deleteArticle(articleId);
  }

  @PutMapping("/{articleId}")
  public WrappedResponseDto<ArticleDetailsDto> updateArticle(@PathVariable Long articleId, @Valid @RequestBody ArticleCreateDto articleUpdateDto) {
    return WrappedResponseDto.success(articleService.updateArticle(articleId, articleUpdateDto));
  }
}
