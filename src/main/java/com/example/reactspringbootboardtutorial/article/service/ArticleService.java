package com.example.reactspringbootboardtutorial.article.service;

import com.example.reactspringbootboardtutorial.article.converter.ArticleConverter;
import com.example.reactspringbootboardtutorial.article.dto.ArticleCreateDto;
import com.example.reactspringbootboardtutorial.article.dto.ArticleDetailsDto;
import com.example.reactspringbootboardtutorial.article.dto.ArticlesRequestDto;
import com.example.reactspringbootboardtutorial.article.model.Article;
import com.example.reactspringbootboardtutorial.article.repository.ArticleRepository;
import com.example.reactspringbootboardtutorial.common.dto.PageableDto;
import com.example.reactspringbootboardtutorial.common.exception.CustomException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArticleService {
  private final ArticleRepository articleRepository;
  private final ArticleConverter articleConverter;

  public PageableDto<ArticleDetailsDto> getArticleList(ArticlesRequestDto dto) {
    Pageable pageable = PageRequest.of(dto.getCurrentPage(), dto.getSize());
    Page<Article> articles = articleRepository.findAllByOrderByIdDesc(pageable);
    return articleConverter.convert(articles);
  }

  public ArticleDetailsDto getArticle(Long articleId) {
    Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException("No article with that number."));

    return articleConverter.convert(article);
  }

  public ArticleDetailsDto saveArticle(ArticleCreateDto articleCreateDto, String author) {
    Article article = new Article();

    article.setTitle(articleCreateDto.getTitle());
    article.setContent(articleCreateDto.getContent());
    article.setAuthor(author);

    return articleConverter.convert(articleRepository.save(article));
  }

  public void deleteArticle(Long articleId) {
    Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException("No article with that number."));

    try {
      articleRepository.delete(article);
    } catch(Exception e) {
      throw new CustomException(e.getMessage());
    }
  }

  public ArticleDetailsDto updateArticle(Long articleId, ArticleCreateDto articleUpdateDto) {
    Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException("No article with that number."));

    article.setTitle(articleUpdateDto.getTitle());
    article.setContent(articleUpdateDto.getContent());

    return articleConverter.convert(articleRepository.save(article));
  }
}