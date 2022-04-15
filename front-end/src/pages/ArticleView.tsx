import React from 'react';
import { useParams } from 'react-router-dom';
import useArticleItem from '../hooks/api/useArticleItem';
import styled from '@emotion/styled';
import Loading from '../components/common/Loading';
import DOMPurify from 'dompurify';

const ArticleView = () => {
  const { articleNumber } = useParams();
  const { data, isSuccess, isLoading } = useArticleItem(Number(articleNumber) || 1);

  if (isLoading) return <Loading msg="게시글을 불러오고 있습니다." isFull={true} />;

  if (!data?.content || !isSuccess) return null;

  const { author, content, created_at, modified_at, title } = data.content;

  const purifyingDom = DOMPurify.sanitize(content);
  const isModified = created_at !== modified_at;
  const onClickGoBack = () => {
    window.history.back();
  };

  return (
    <StyledWrap>
      <StyledHeader>
        <StyledTitle>{title}</StyledTitle>
        <StyledInformation>
          <StyledUnit>{author}</StyledUnit>
          <StyledUnit>{created_at}</StyledUnit>
          {isModified && <StyledUnit>{created_at}</StyledUnit>}
        </StyledInformation>
      </StyledHeader>
      <StyledContent>
        <StyledTextarea dangerouslySetInnerHTML={{ __html: purifyingDom }} />
      </StyledContent>
      <StyledButton role="link" onClick={onClickGoBack}>
        목록으로 돌아가기
      </StyledButton>
    </StyledWrap>
  );
};

const StyledWrap = styled.main``;

const StyledHeader = styled.header``;

const StyledTitle = styled.h2``;

const StyledContent = styled.div``;

const StyledTextarea = styled.div``;

const StyledInformation = styled.div``;

const StyledUnit = styled.span``;

const StyledButton = styled.a``;

export default ArticleView;
