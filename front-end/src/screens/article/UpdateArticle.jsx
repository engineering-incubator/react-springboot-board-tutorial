import React, { useEffect, useState } from 'react';
import Template from '../../components/common/Template';
import { updateArticle, getArticle } from '../../api/articleApi';
import Button from '../../components/common/Button';
import { isFailureStatus } from '../../api/config/status-code.config';

import { useParams } from 'react-router-dom';
// customHook으로 import해서 쓰기
function useFetchArticle() {
  const params = useParams();
  const [article, setArticle] = useState({});
  useEffect(function fetchArticle() {
    (async function getItem() {
      const item = await getArticle(params.article_id);
      setArticle(item);
    })();
  }, []);

  return article;
}

const UpdateArticle = (props) => {
  const [article, setArticle] = useState({ title: '', content: '' });
  const previusArticle = useFetchArticle();
  const params = useParams();

  const getValue = (e) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
    console.log(article);
  };

  const requestUpdate = async () => {
    // FIXME validation 통과하지 못했을 경우, 서버로 요청을 하지 말아야 함.
    const result = await updateArticle(params.article_id, article);
    console.log(result);
    if (isFailureStatus(result.code)) {
      return alert(result.message);
    }
    alert('글이 수정되었습니다.');
    document.location.href = `/article/${params.article_id}`;
  };
  
  console.log('>', props)
  console.log('>previusArticle:', previusArticle)

  return (
    <>
      <Template title="글수정">
        <textarea
          cols="60"
          rows="1"
          placeholder="제목"
          name="title"
          onChange={getValue}
          defaultValue={previusArticle.title}
        >
          {/* {previusArticle.title} */}
          {props.location.state.article.title}
        </textarea>
        <textarea
          cols="60"
          rows="30"
          placeholder="본문"
          name="content"
          onChange={getValue}
          defaultValue={previusArticle.content}
        >
          {/* {previusArticle.content} */}
          {props.location.state.article.content}

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
