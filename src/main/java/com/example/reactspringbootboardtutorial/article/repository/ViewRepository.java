package com.example.reactspringbootboardtutorial.article.repository;

import com.example.reactspringbootboardtutorial.article.model.Article;
import com.example.reactspringbootboardtutorial.article.model.View;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ViewRepository extends JpaRepository<View, Long> {
    Optional<View> findAllByArticleAndIp(Article article, String ip);
}
