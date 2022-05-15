import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { requester } from "../configures/requestConfigures";
import { isSuccess } from "../utilites/validates/httpValidation";
import { Link } from "react-router-dom";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import { Container, Title } from "../components/style";
import { articleDate } from "../utilites/cast";

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
        setArticles(res.data.content.items);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const NavigateLink = styled(Link)`
    text-decoration: none;
    &:visited,
    &:link,
    &:focus,
    &:hover,
    &:active {
      text-decoration: none;
    }
  `;
  const Card = styled.div`
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 16px;
  `;

  const ItemTitle = styled.div`
    font-size: 20px;
    color: #202a43;
    margin-bottom: 10px;
    letter-spacing: -0.2px;
  `;
  const ItemContents = styled.p`
    font-size: 16px;
    color: #98a0b3;
    margin: 0 0 18px 0;
    letter-spacing: -0.2px;
  `;
  const SubContents = styled.div`
    font-size: 12px;
    color: #98a0b3;
    margin: 0;
  `;

  return (
    <Container>
      <Title>&#127752; 새롭게 올라온 글이에요</Title>
      {!isEmpty(articles) &&
        articles.map((article) => (
          <NavigateLink
            to={`/articles/${article.article_id}`}
            key={article.article_id}
          >
            <Card>
              <ItemTitle>{article.title}</ItemTitle>
              <ItemContents>{article.content}</ItemContents>
              <SubContents>
                {article.author} <b>·</b> {articleDate(article.created_at)}{" "}
                <b>·</b> 조회수
                {article.views}
              </SubContents>
            </Card>
          </NavigateLink>
        ))}
      {isEmpty(articles) && <SubContents>최근 게시글이 없습니다.</SubContents>}
    </Container>
  );
}
