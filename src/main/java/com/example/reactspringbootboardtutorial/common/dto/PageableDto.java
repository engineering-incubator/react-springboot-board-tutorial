package com.example.reactspringbootboardtutorial.common.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class PageableDto<T> {
	private final List<T> items;
	private final int totalPages;
	private final int currentPage;
	private final int size;
	private final Long totalElements;

	public PageableDto(List<T> items, int totalPages, int currentPage, int size, Long totalElements) {
		this.items = items;
		this.totalPages = totalPages;
		this.currentPage = currentPage + 1;
		this.size = size;
		this.totalElements = totalElements;
	}
}
