import React, { useState } from "react";
import axios from "axios";
import { isSuccess } from "../utilites/validates/httpValidation";
import { useHistory } from "react-router-dom";
import {
  contentValidation,
  titleValidation,
} from "./utilities/articleValidation";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
export default function ArticleCreate() {
  const history = useHistory();
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
  });

  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [contentErrorMessage, setContentErrorMessage] = useState("");

  const onChangeTitle = (e) => {
    setArticleData({ ...articleData, title: e.currentTarget.value });
  };

  const onChangeContent = (e) => {
    setArticleData({ ...articleData, content: e.currentTarget.value });
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
        alert("모든 값을 입력해주세요.");
        return;
      }
      const res = await axios.post("/api/v1/articles", articleData);
      if (isSuccess(res)) {
        alert("글이 등록되었습니다.");
        history.replace("/articles?page=1");
        return;
      }
      return alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>글 작성하기</h1>
      <div>
        <h4>제목</h4>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={articleData.title}
          onChange={onChangeTitle}
          onFocus={() => {
            setTitleErrorMessage("");
          }}
        />
        {!isEmpty(titleErrorMessage) && <p>{titleErrorMessage}</p>}
      </div>
      <div>
        <h4>내용</h4>
        <textarea
          placeholder="글 내용을 입력해주세요."
          value={articleData.content}
          onChange={onChangeContent}
          onFocus={() => {
            setContentErrorMessage("");
          }}
        />
        {!isEmpty(contentErrorMessage) && <p>{contentErrorMessage}</p>}
      </div>
      <button type="submit">등록하기</button>
    </form>
  );
}
