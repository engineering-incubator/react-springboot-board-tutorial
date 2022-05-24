import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle, deleteArticle } from '../../api/articleApi';
import Template from '../../components/common/Template';
import ArticleDetail from '../../components/article/ArticleDetail';
import Button from '../../components/common/Button';
import { isFailureStatus } from '../../api/config/status-code.config';
import { useFetchArticle } from '../../api/hooks/useFetchArticle';

const Article = () => {
  const article = useFetchArticle();
  const params = useParams();

  const requestDelete = async () => {
    const result = await deleteArticle(params.article_id);
    console.log(result);
    if (isFailureStatus(result.code)) {
      return alert(result.message);
    }
    console.log('article: ', article);
    alert('글이 삭제되었습니다.');
    document.location.href = '/article';
  };
  return (
    <>
      <Template title="글 상세">
        <p>{article.id}</p>
        <ArticleDetail data={article} />
        <Link
          to={{
            pathname: `/article/update/` + article.article_id,
            state: { article },
          }}
        >
          <Button style={{ width: '48%', marginRight: '4%' }}>수정</Button>
        </Link>
        <Button style={{ width: '48%' }} onClick={() => requestDelete()}>
          삭제
        </Button>
      </Template>
    </>
  );
};

export default Article;
