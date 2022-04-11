package com.example.reactspringbootboardtutorial.articles.service;

import com.example.reactspringbootboardtutorial.articles.dto.ArticleCreateDto;
import com.example.reactspringbootboardtutorial.articles.dto.ArticleDetailsDto;
import com.example.reactspringbootboardtutorial.articles.model.Article;
import com.example.reactspringbootboardtutorial.articles.repository.ArticlesRepository;
import com.example.reactspringbootboardtutorial.common.exception.CustomException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArticlesService {
  private final ArticlesRepository articleRepository;

  public List<ArticleDetailsDto> getArticleList() {
    List<Article> articles = articleRepository.findAll();
    return articles.stream().map(ArticleDetailsDto::of).collect(Collectors.toList());
  }

  public ArticleDetailsDto getArticle(Long articleId) {
    Article article = articleRepository.findById(articleId)
        .orElseThrow(() -> new CustomException("No article with that number."));

    return ArticleDetailsDto.of(article);
  }

  public ArticleDetailsDto saveArticle(ArticleCreateDto articleCreateDto) {
    Article article = new Article();

    article.setTitle(articleCreateDto.getTitle());
    article.setContent(articleCreateDto.getContent());

    return ArticleDetailsDto.of(articleRepository.save(article));
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

    return ArticleDetailsDto.of(articleRepository.save(article));
  }
}
