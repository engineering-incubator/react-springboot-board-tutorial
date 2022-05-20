import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import { isSuccess } from "../utilites/validates/httpValidation";
import { useFetchPostById } from "./hooks/useFetchPostById";
import { requester } from "../configures/requestConfigures";
import axios from "axios";

export default function ArticlePost() {
  const { articleId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const article = useFetchPostById(articleId);
  const { article_id, created_at, modified_at, author, views } = article;

  const onUpdate = () => {
    history.push(`/articles/${articleId}/edit`);
  };

  const onDelete = async () => {
    try {
      const res = await requester.delete(`/v1/articles/${article.article_id}`);
      if (isSuccess(res)) {
        alert("글이 삭제되었습니다.");
        history.replace(`/articles?page=${location.state.page}`);
        return;
      }
      return alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isEmpty(article) && <h5>불러오는 중입니다...</h5>}
      {!isEmpty(article) && (
        <article>
          <header>{article.title}</header>
          <ul>
            <li>
              <strong>게시글 번호</strong> {article_id}
            </li>
            <li>
              <strong>작성일</strong> <time>{created_at}</time>
            </li>
            <li>
              <strong>변경일</strong> <time>{modified_at}</time>
            </li>
            <li>
              <strong>작성자</strong> {author}
            </li>
            <li>
              <strong>조회수</strong> {views}
            </li>
          </ul>
          <div>
            <button onClick={onUpdate}>수정</button>
            <button onClick={onDelete}>삭제</button>
          </div>
          <p>{article.content}</p>
        </article>
      )}
    </>
  );
}
