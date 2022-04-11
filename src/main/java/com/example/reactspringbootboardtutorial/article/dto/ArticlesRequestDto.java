package com.example.reactspringbootboardtutorial.article.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class ArticlesRequestDto {
    private Integer currentPage = 1;
    private Integer size = 10;

    public Integer getCurrentPage() {
        // zero-based 이기 때문에 semantic uri 전략을 위해 서버에서 데이터를 가져올 때, -1를 시켜준다.
        return currentPage - 1;
    }
}