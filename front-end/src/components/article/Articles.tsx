import React, { useEffect } from 'react';
import useArticles from '../../hooks/useArticles';
import { useQueryParam, NumberParam, withDefault } from 'use-query-params';
import Loading from '../common/Loading';
import ArticleItem from './ArticleItem';
import styled from '@emotion/styled';

const Articles = () => {
  const [query, setQuery] = useQueryParam('currentPage', withDefault(NumberParam, 1));
  const size = 10;
  const params = {
    currentPage: Number(query) || 1,
    size,
  };
  const { isSuccess, isLoading, isError, data } = useArticles(params);

  useEffect(() => {
    setQuery(query, 'replaceIn');
  }, [query, setQuery]);

  console.log(data);

  return (
    <>
      {isError && '에러에러'}
      {isLoading ? (
        <Loading msg="게시글을 불러오는 중입니다" />
      ) : isSuccess && data?.content.items ? (
        <div>
          <h1>board</h1>
          <div role="table" aria-label="게시글" aria-rowcount={size}>
            <div role="rowgroup">
              <div role="row">
                <span role="columnheader">게시글 번호</span>
                <span role="columnheader">제목</span>
                <span role="columnheader">작성자</span>
                <span role="columnheader">작성일</span>
              </div>
            </div>
            <div role="rouwgroup">
              {data?.content.items.map((item, idx) => (
                <ArticleItem key={idx} data={item} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        '게시글이 없습니다'
      )}
    </>
  );
};

export default Articles;
