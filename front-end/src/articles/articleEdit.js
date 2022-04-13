import axios from "axios";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import { isSuccess } from "../utilites/validates/httpValidation";
import { useFetchPostById } from "./hooks/useFetchPostById";
import {
  contentValidation,
  titleValidation,
} from "./utilities/articleValidation";

export default function ArticleEdit() {
  const param = useParams();
  const history = useHistory();

  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [contentErrorMessage, setContentErrorMessage] = useState("");
  const [article, setArticle] = useFetchPostById(param.articleId);

  const onChangeTitle = (e) => {
    setArticle({
      ...article,
      title: e.currentTarget.value,
    });
  };

  const onChangeContent = (e) => {
    setArticle({
      ...article,
      content: e.currentTarget.value,
    });
  };

  const isValid = () => {
    const titleErrorMessage = titleValidation(article.title);
    setTitleErrorMessage(titleErrorMessage);
    const contentErrorMessage = contentValidation(article.content);
    setContentErrorMessage(contentErrorMessage);

    return isEmpty(titleErrorMessage) && isEmpty(contentErrorMessage);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isValid()) {
        alert("모든 값을 제대로 입력해주세요.");
        return;
      }
      const res = await axios.put(
        `/api/v1/articles/${param.articleId}`,
        article,
      );
      if (isSuccess(res)) {
        alert("글이 변경되었습니다.");
        history.replace(`/articles/${param.articleId}`);
        return;
      }
      return alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (!article) {
    return null;
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>글 수정하기</h1>
        <div>
          <h4>제목</h4>
          <input type="text" value={article.title} onChange={onChangeTitle} />
          {!isEmpty(titleErrorMessage) && <p>{titleErrorMessage}</p>}
        </div>
        <div>
          <h4>내용</h4>
          <textarea value={article.content} onChange={onChangeContent} />
          {!isEmpty(contentErrorMessage) && <p>{contentErrorMessage}</p>}
        </div>
        <button type="submit">수정하기</button>
      </form>
      <button
        onClick={() => {
          history.replace(`/articles/${param.articleId}`);
        }}
      >
        취소하기
      </button>
    </>
  );
}
