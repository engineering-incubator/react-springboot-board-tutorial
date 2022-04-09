import React, { useEffect, useState } from "react";
import axios from "axios";
import { isSuccess } from "../utilites/validates/httpValidation";
import { useHistory, useParams } from "react-router-dom";
import {
  contentValidation,
  titleValidation,
} from "./utilities/articleValidation";
import { isEmpty } from "../utilites/typeGuard/typeGuard";

export default function ArticlePut() {
  const param = useParams();
  const history = useHistory();
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
  });
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [contentErrorMessage, setContentErrorMessage] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`/api/v1/articles/${param.articleId}`);
        if (isSuccess(res)) {
          //batch로 돌면서 최종 수정된 내용만 반영
          setArticleData({
            ...articleData,
            title: res.data.content.title,
            content: res.data.content.content,
          });
          return;
        }
        return alert(res.data.message);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onChangeTitle = (e) => {
    setArticleData({
      ...articleData,
      title: e.currentTarget.value,
    });
  };

  const onChangeContent = (e) => {
    setArticleData({
      ...articleData,
      content: e.currentTarget.value,
    });
  };

  const isValid = () => {
    const titleErrorMessage = titleValidation(articleData.title);
    setTitleErrorMessage(titleErrorMessage);
    const contentErrorMessage = contentValidation(articleData.content);
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
        articleData,
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

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>글 수정하기</h1>
        <div>
          <h4>제목</h4>
          <input
            type="text"
            value={articleData.title}
            onChange={onChangeTitle}
          />
          {!isEmpty(titleErrorMessage) && <p>{titleErrorMessage}</p>}
        </div>
        <div>
          <h4>내용</h4>
          <textarea value={articleData.content} onChange={onChangeContent} />
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
