package com.example.reactspringbootboardtutorial.articles.repository;

import com.example.reactspringbootboardtutorial.articles.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticlesRepository extends JpaRepository<Article, Long> {
    List<Article> findArticlesByOrderByIdDesc();
}
