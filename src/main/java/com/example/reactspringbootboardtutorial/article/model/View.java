package com.example.reactspringbootboardtutorial.article.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "views")
@NoArgsConstructor
@AllArgsConstructor
public class View {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    private Article article;

    @Column(columnDefinition = "VARCHAR(20)")
    private String ip;
}
