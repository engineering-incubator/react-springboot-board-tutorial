import React, { useEffect, useState } from 'react';
import Template from '../../components/common/Template';
import { createArticle } from '../../api/articleApi';
import Button from '../../components/common/Button';
import { isFailureStatus } from "../../api/config/status-code.config";

const CreateArticle = () => {
  const [article, setArticle] = useState({ title: '', content: '' });

  const getValue = (e) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
    console.log(article);
  };

  const requestCreate = async () => {
    // FIXME validation 통과하지 못했을 경우, 서버로 요청을 하지 말아야 함.
    const result = await createArticle(article);
    console.log('>>' ,result)
    if (isFailureStatus(result.code)) {
      return alert(result.message);
    }

    alert('글이 작성되었습니다.');
    document.location.href = '/article';
  };

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
        <textarea
          cols="60"
          rows="30"
          placeholder="본문"
          name="content"
          onChange={getValue}
        ></textarea>
        <Button onClick={() => {requestCreate()}}>작성 완료</Button>
      </Template>
    </>
  );
};

export default CreateArticle;
