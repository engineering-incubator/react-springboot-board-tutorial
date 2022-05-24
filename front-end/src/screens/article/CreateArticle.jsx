import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Template from '../../components/common/Template';
import { createArticle } from '../../api/articleApi';
import Button from '../../components/common/Button';
import { isFailureStatus } from '../../api/config/status-code.config';
import { isAllFilled } from '../../validation/FilledCheck';
import ErrorMessage from '../../components/common/ErrorMessage';

const CreateArticle = () => {
	const history = useHistory();
  const [article, setArticle] = useState({ title: '', content: '' });
  const [isClickSubmitButton, setIsClickSubmitButton] = useState(false);
 
  const getValue = (e) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
    console.log(article);
  };

  const requestCreate = async () => {
    const result = await createArticle(article);
    console.log('>>', result);
    if (isFailureStatus(result.code)) {
      return alert(result.message);
    }
    alert('글이 작성되었습니다.');
    history.push('/article');
  };
 
  const isTitleFiveLettersLess = (value) => {
  return value.length <= 5
  }
  return (
    <>
      <Template title="글쓰기">
        <textarea
          cols="60"
          rows="1"
          placeholder="제목"
          name="title"
          onChange={getValue}
        ></textarea>
        {isClickSubmitButton && !article.title && <ErrorMessage>❕ 글 제목을 입력해주세요</ErrorMessage>}
        <textarea
          cols="60"
          rows="30"
          placeholder="본문"
          name="content"
          onChange={getValue}
        ></textarea>
        {isClickSubmitButton && !article.content && <ErrorMessage>❕ 본문 내용을 입력해주세요</ErrorMessage>}

        <Button
          onClick={() => {
            setIsClickSubmitButton(true)
            isAllFilled(article) && !isTitleFiveLettersLess(article.title.length) && requestCreate();
          }}
        >
          작성 완료
        </Button>
      </Template>
    </>
  );
};

export default CreateArticle;
