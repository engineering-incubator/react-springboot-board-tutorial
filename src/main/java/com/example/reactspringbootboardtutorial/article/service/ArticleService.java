package com.example.reactspringbootboardtutorial.article.service;

import com.example.reactspringbootboardtutorial.article.converter.ArticleConverter;
import com.example.reactspringbootboardtutorial.article.dto.ArticleCreateDto;
import com.example.reactspringbootboardtutorial.article.dto.ArticleDetailsDto;
import com.example.reactspringbootboardtutorial.article.dto.ArticlesRequestDto;
import com.example.reactspringbootboardtutorial.article.model.Article;
import com.example.reactspringbootboardtutorial.article.repository.ArticleRepository;
import com.example.reactspringbootboardtutorial.authentication.CustomUserDetails;
import com.example.reactspringbootboardtutorial.common.dto.PageableDto;
import com.example.reactspringbootboardtutorial.common.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArticleService {
  private final ArticleRepository articleRepository;
  private final ArticleConverter articleConverter;

  public PageableDto<ArticleDetailsDto> getArticleList(ArticlesRequestDto dto) {
    Pageable pageable = PageRequest.of(dto.getCurrentPage(), dto.getSize());
    Page<Article> articles = articleRepository.findAllByDeletedIsFalseOrderByIdDesc(pageable);
    return articleConverter.convert(articles);
  }

  public ArticleDetailsDto getArticle(Long articleId) {
    Article article = articleRepository.findByIdAndDeletedIsFalse(articleId)
            .orElseThrow(() -> new CustomException("No article with that number."));
    articleRepository.updateViews(articleId);
    return articleConverter.convert(article);
  }

  public ArticleDetailsDto saveArticle(ArticleCreateDto articleCreateDto, String author) {
    Article article = new Article();

    article.setTitle(articleCreateDto.getTitle());
    article.setContent(articleCreateDto.getContent());
    article.setAuthor(author);
    article.setViews(0L);
    article.setDeleted(false);

    return articleConverter.convert(articleRepository.save(article));
  }

  public void deleteArticle(Long articleId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    boolean adminCheck = authentication
            .getAuthorities().stream().anyMatch(item -> item.getAuthority().equals("ROLE_ADMIN"));
    String username = ((CustomUserDetails) authentication.getPrincipal()).getUsername();
    Article article = articleRepository.findByIdAndDeletedIsFalse(articleId)
            .orElseThrow(() -> new CustomException("No article with that number."));

    if (!Objects.equals(username, article.getAuthor()) && !adminCheck)
      throw new CustomException("Only author and admins are allowed to delete this article.");

    article.setDeleted(true);

    try {
      articleRepository.save(article);
    } catch(Exception e) {
      throw new CustomException(e.getMessage());
    }
  }

  public ArticleDetailsDto updateArticle(Long articleId, ArticleCreateDto articleUpdateDto) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    boolean adminCheck = authentication
            .getAuthorities().stream().anyMatch(item -> item.getAuthority().equals("ROLE_ADMIN"));
    String username = ((CustomUserDetails) authentication.getPrincipal()).getUsername();

    Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException("No article with that number."));

    if (!Objects.equals(username, article.getAuthor()) && !adminCheck)
      throw new CustomException("Only author and admins are allowed to edit this article.");

    article.setTitle(articleUpdateDto.getTitle());
    article.setContent(articleUpdateDto.getContent());

    return articleConverter.convert(articleRepository.save(article));
  }
}
