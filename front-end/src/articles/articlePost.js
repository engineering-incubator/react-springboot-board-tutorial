import React, {useEffect, useState} from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import { isSuccess } from "../utilites/validates/httpValidation";
import { useFetchPostById } from "./hooks/useFetchPostById";
import { requester } from "../configures/requestConfigures";
import axios from "axios";

export default function ArticlePost() {
  const {articleId} = useParams();
  const history = useHistory();
  const location = useLocation();
  const article = useFetchPostById(articleId);


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

  if (article === null) {return <h5>불러오는 중입니다...</h5>};
  const {article_id, created_at, modified_at} = article

  return (
    <>
      {!isEmpty(article) && (
        <article>
          <h2>{article.title}</h2>
          <ol>
            <li>
              <strong>게시글 번호</strong> {article_id}
            </li>
            <li>
              <strong>작성일</strong> {created_at}
            </li>
            <li>
              <strong>변경일</strong> {modified_at}
            </li>
            <li>
              <strong>작성자</strong> {article.author}
            </li>
            <li>
              <strong>조회수</strong> {article.views}
            </li>
          </ol>
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
