import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import { isSuccess } from "../utilites/validates/httpValidation";

export default function ArticlePost() {
  const param = useParams();
  const history = useHistory();
  const [article, setArticle] = useState();

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`/api/v1/articles/${param.articleId}`);
        if (isSuccess(res)) {
          return setArticle(res.data.content);
        }
        alert(res.data.message);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onDelete = async () => {
    try {
      const res = await axios.delete(`/api/v1/articles/${article.article_id}`);
      if (isSuccess(res)) {
        alert("글이 삭제되었습니다.");
        history.replace("/articles?page=1");
        return;
      }
      return alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            history.push(`/articles/${param.articleId}/change`);
          }}
        >
          수정
        </button>
        <button onClick={onDelete}>삭제</button>
      </div>
      {/* FIXME 정말 컨텐츠가 없는 경우는 어떻게 처리할 것인지. */}
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
              <strong>작성자</strong> {article.author}
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
