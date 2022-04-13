import React, { useEffect } from 'react';
import useArticles from '../../hooks/useArticles';
import { useQueryParam, NumberParam, withDefault } from 'use-query-params';
import Loading from '../common/Loading';
import ArticleItem from './ArticleItem';
import styled from '@emotion/styled';
import { StyledCommonTitle, StyledArticleRow } from '../../styles/common';

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

  return (
    <>
      {isError && '에러에러'}
      <StyledWrap>
        <StyledCommonTitle>게시글</StyledCommonTitle>
        {isLoading ? (
          <Loading isFull={false} msg="게시글을 불러오는 중입니다" />
        ) : isSuccess && data?.content.items ? (
          <>
            <StyledArticles role="table" aria-label="게시글" aria-rowcount={size}>
              <StyledArticlesHeader role="rowgroup">
                <StyledArticleRow role="row">
                  <span role="columnheader">번호</span>
                  <span role="columnheader">제목</span>
                  <span role="columnheader">작성자</span>
                  <span role="columnheader">작성일</span>
                </StyledArticleRow>
              </StyledArticlesHeader>
              <div role="rouwgroup">
                {data?.content.items.map((item, idx) => (
                  <ArticleItem key={idx} data={item} />
                ))}
              </div>
            </StyledArticles>
          </>
        ) : (
          <StyledEmpty>게시글이 없습니다</StyledEmpty>
        )}
      </StyledWrap>
    </>
  );
};

const StyledWrap = styled.section``;

const StyledArticles = styled.article`
  padding: 0 20px;
`;

const StyledArticlesHeader = styled.div`
  width: 100%;
`;

const StyledEmpty = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

export default Articles;
