import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { requester } from "../configures/requestConfigures";
import { isSuccess } from "../utilites/validates/httpValidation";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import {
  CardBox,
  Container,
  NavigateLink,
  Title,
} from "../components/style/globalStyle";
import { articleDate } from "../utilites/cast";
import theme from "../components/style/theme";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await requester.get(`/v1/articles?currentPage=1`);
        if (!isSuccess(res)) {
          alert(res.data.message);
          return;
        }
        setArticles(res.data.content.items.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const textLimit = (article) => {
    if (article.length > 100) {
      return `${article.slice(0, 100)}···`;
    }
    return article;
  };

  const ArticleTitle = styled.h2`
    margin: 0 0 10px 0;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.2px;
    color: ${theme.colors.gray};
    &:hover {
    text-decoration: underline;
  `;
  const ArticleContent = styled.h3`
    margin: 0 0 18px 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.2px;
    color: ${theme.colors.mediumGray};
  `;
  const ArticleInfos = styled.div`
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: ${theme.colors.lightGray};
  `;

  return (
    <Container>
      <Title>&#127752; 새롭게 올라온 글이에요</Title>
      {isEmpty(articles) && <h3>아직 새로운 글이 없어요</h3>}
      {!isEmpty(articles) &&
        articles.map((article) => (
          <NavigateLink
            to={`/articles/${article.article_id}`}
            key={article.article_id}
          >
            <CardBox>
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticleContent>{textLimit(article.content)}</ArticleContent>
              <ArticleInfos>
                {article.author} <b>·</b> {articleDate(article.created_at)}
                <b>·</b> 조회수
                {article.views}
              </ArticleInfos>
            </CardBox>
          </NavigateLink>
        ))}
    </Container>
  );
}
