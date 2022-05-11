import React, { useEffect, useState } from 'react';
import Template from '../../components/common/Template';
import { updateArticle, getArticle } from '../../api/articleApi';
import Button from '../../components/common/Button';
import { isFailureStatus } from '../../api/config/status-code.config';
import { useParams } from 'react-router-dom';

const UpdateArticle = (props) => {
  const [article, setArticle] = useState( props.location.state.article );
  const params = useParams();

  const getValue = (e) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
    console.log(article);
  };

  const requestUpdate = async () => {
    const result = await updateArticle(params.article_id, article);
    console.log(result);
    if (isFailureStatus(result.code)) {
      return alert(result.message);
    }
    alert('글이 수정되었습니다.');
    document.location.href = `/article/${params.article_id}`;
  };
  
  return (
    <>
      <Template title="글수정">
        <textarea
          cols="60"
          rows="1"
          placeholder="제목"
          name="title"
          onChange={getValue}
          value={article.title}
        >
        </textarea>
        <textarea
          cols="60"
          rows="30"
          placeholder="본문"
          name="content"
          onChange={getValue}
          value={article.content}
        >
        </textarea>
        <Button
          onClick={() => {
            requestUpdate();
          }}
        >
          수정 완료
        </Button>
      </Template>
    </>
  );
};

export default UpdateArticle;
