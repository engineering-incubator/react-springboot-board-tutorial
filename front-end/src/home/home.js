import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import {
  CardBox,
  Container,
  NavigateLink,
  Title,
} from "../components/style/globalStyle";
import { parseFormattedDate } from "../utilites/castDate";
import theme from "../components/style/theme";
import { fetchLatestArticleListsService } from "../services/articleServices";

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

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await fetchLatestArticleListsService();
      if (!res.isSuccess) {
        alert(res.data.message);
        return;
      }
      setArticles(res.data.items);
    })();
  }, []);

  const textLimit = (article) => {
    // FIXME css 로 처리하기
    if (article.length > 100) {
      return `${article.slice(0, 100)}···`;
    }
    return article;
  };

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
              <h2 className="article-title">{article.title}</h2>
              <ArticleContent>{textLimit(article.content)}</ArticleContent>
              <ArticleInfos>
                {article.author} <b>·</b>{" "}
                {parseFormattedDate(article.created_at)}
                <b>·</b> 조회수
                {article.views}
              </ArticleInfos>
            </CardBox>
          </NavigateLink>
        ))}
    </Container>
  );
}
