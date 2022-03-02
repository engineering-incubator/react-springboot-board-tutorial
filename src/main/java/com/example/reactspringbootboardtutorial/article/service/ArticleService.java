package com.example.reactspringbootboardtutorial.article.service;

import com.example.reactspringbootboardtutorial.article.dto.ArticleCreateDto;
import com.example.reactspringbootboardtutorial.article.dto.ArticleDetailsDto;
import com.example.reactspringbootboardtutorial.article.model.Article;
import com.example.reactspringbootboardtutorial.article.repository.ArticleRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArticleService {
  private final ArticleRepository articleRepository;

  public ArticleDetailsDto getArticle(Long articleId) {
    Optional<Article> targetArticle = articleRepository.findById(articleId);
    return targetArticle.map(ArticleDetailsDto::of).orElse(null);
  }

  public ArticleDetailsDto saveArticle(ArticleCreateDto articleCreateDto) {
    Article article = new Article();

    article.setTitle(articleCreateDto.getTitle());
    article.setContent(articleCreateDto.getContent());

    return ArticleDetailsDto.of(articleRepository.save(article));
  }

  public void deleteArticle(Long articleId) throws Exception {
    Optional<Article> targetArticle = articleRepository.findById(articleId);

    if (targetArticle.isPresent()) {
      articleRepository.delete(targetArticle.get());
    } else {
      throw new Exception("No article with that number.");
    }
  }
}
