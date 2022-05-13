package com.example.reactspringbootboardtutorial.article.repository;

import com.example.reactspringbootboardtutorial.article.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
  Page<Article> findAllByDeletedIsFalseOrderByIdDesc(Pageable pageable);
  Optional<Article> findByIdAndDeletedIsFalse(Long id);

  @Modifying
  @Transactional
  @Query(value = "UPDATE article SET article.views = article.views + 1 WHERE article.id = :id", nativeQuery = true)
  void updateViews(@Param("id") Long articleId);
}
