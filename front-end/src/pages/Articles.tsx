import React, { useEffect, useState } from 'react';
import useArticles from '../hooks/api/useArticles';
import { useQueryParam, withDefault, NumberParam } from 'use-query-params';
import Loading from '../components/common/Loading';
import ArticleItem from '../components/article/ArticleItem';
import styled from '@emotion/styled';
import {
  StyledCommonTitle,
  StyledArticleRow,
  StyledCommonFlexContainer,
  StyledCommonPositiveButton,
} from '../styles/common';
import Pagination from '../components/common/Pagination';

const Articles = () => {
  const [query, setQuery] = useQueryParam('currentPage', withDefault(NumberParam, 1));
  const [currentPage, setCurrentPage] = useState(query);
  const [totalElements, setTotalElements] = useState(0);
  const size = 10;
  const params = {
    currentPage: query,
    size,
  };
  const { isSuccess, isLoading, isError, data } = useArticles(params);

  useEffect(() => {
    if (!data?.content || !isSuccess) return;
    const { totalPages } = data.content;

    setQuery(currentPage, 'replaceIn');
    setTotalElements(totalPages);
  }, [query, setQuery, data, isSuccess, setCurrentPage, currentPage, setTotalElements]);

  const onClickPagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setQuery(pageNumber);
  };

  const onClickGoToPostPage = () => (window.location.href = '/article/write');

  return (
    <>
      {isError && '에러에러'}
      <StyledWrap>
        <StyledCommonTitle>게시글</StyledCommonTitle>
        {isLoading ? (
          <Loading isFull={false} msg="게시글을 불러오는 중입니다" styles={{ padding: '30px 0' }} />
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
        <Pagination
          pageCount={totalElements}
          onClickPagination={onClickPagination}
          currentPage={currentPage}
        />
        <StyledCommonFlexContainer justify={'flex-end'} padding={'12px 12px'}>
          <StyledCommonPositiveButton as={'a'} isPositive={true} onClick={onClickGoToPostPage}>
            글쓰기
          </StyledCommonPositiveButton>
        </StyledCommonFlexContainer>
      </StyledWrap>
    </>
  );
};

const StyledWrap = styled.section``;

const StyledArticles = styled.article`
  padding: 0 12px;
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
