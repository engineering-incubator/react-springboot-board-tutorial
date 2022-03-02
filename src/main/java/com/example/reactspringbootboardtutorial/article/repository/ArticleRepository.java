package com.example.reactspringbootboardtutorial.article.repository;

import com.example.reactspringbootboardtutorial.article.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
