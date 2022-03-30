import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { isEmpty } from "../utilites/typeGuard/typeGuard";

export default function Article() {
  const location = useLocation();
  const articleId = location.pathname.substr(9);
  const [article, setArticle] = useState();

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`/api/v1/article/${articleId}`);
        if (res.data.code === "SUCCESS") {
          return setArticle(res.data.content);
        }
        return alert(res.data.message);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div>
        <button>수정</button>
        <button>삭제</button>
      </div>
      {isEmpty(article) && <h5>불러오는 중입니다...</h5>}
      {!isEmpty(article) && (
        <article>
          <h2>{article.title}</h2>
          <ol>
            <li>
              <strong>게시글 번호</strong> {article.article_id}
            </li>
            <li>
              <strong>작성일</strong> {article.created_at}
            </li>
            <li>
              <strong>변경일</strong> {article.modified_at}
            </li>
            <li>
              <strong>작성자</strong> 김모찌
            </li>
            <li>
              <strong>조회수</strong> 0
            </li>
          </ol>
          <p>{article.content}</p>
        </article>
      )}
    </>
  );
}
