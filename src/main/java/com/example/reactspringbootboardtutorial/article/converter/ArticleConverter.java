package com.example.reactspringbootboardtutorial.article.converter;

import com.example.reactspringbootboardtutorial.article.dto.ArticleDetailsDto;
import com.example.reactspringbootboardtutorial.article.model.Article;
import com.example.reactspringbootboardtutorial.common.dto.PageableDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ArticleConverter {
	public ArticleDetailsDto convert(Article article) {
		return ArticleDetailsDto.builder()
			.article_id(article.getId())
			.author(article.getAuthor())
			.content(article.getContent())
			.title(article.getTitle())
			.created_at(article.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm")))
			.modified_at(article.getModifiedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm")))
			.views(article.getViews())
			.build();
	}

	public List<ArticleDetailsDto> convert(List<Article> articles) {
		return articles.stream().map(this::convert).collect(Collectors.toList());
	}

	public PageableDto<ArticleDetailsDto> convert(Page<Article> pageableArticles) {
		List<ArticleDetailsDto> items = pageableArticles.getContent()
			.stream()
			.map(this::convert)
			.collect(Collectors.toList());

		return new PageableDto<>(items, pageableArticles.getTotalPages(),
			pageableArticles.getNumber(), pageableArticles.getSize(), pageableArticles.getTotalElements());
	}
}
