import React from 'react';
import { useParams } from 'react-router-dom';
import useArticleItem from '../hooks/api/useArticleItem';
import {
  StyledCommonFlexContainer,
  StyledCommonNegativeButton,
  StyledCommonWrap,
} from '../styles/common';
import styled from '@emotion/styled';
import Loading from '../components/common/Loading';
import DOMPurify from 'dompurify';
import { generateDate } from '../utils';
import { colors } from '../styles/variables';

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
    <StyledCommonWrap>
      <StyledHeader>
        <StyledTitle>{title}</StyledTitle>
        <StyledName>{author}</StyledName>
        <StyledInformation>
          <StyledUnit>{generateDate(created_at)}</StyledUnit>
          {isModified && <StyledUnit>{generateDate(modified_at)}</StyledUnit>}
        </StyledInformation>
      </StyledHeader>
      <StyledContent>
        <StyledTextarea dangerouslySetInnerHTML={{ __html: purifyingDom }} />
      </StyledContent>
      <StyledCommonFlexContainer>
        <StyledCommonNegativeButton role="link" onClick={onClickGoBack}>
          목록으로 돌아가기
        </StyledCommonNegativeButton>
      </StyledCommonFlexContainer>
    </StyledCommonWrap>
  );
};

const StyledHeader = styled.header``;

const StyledTitle = styled.h2`
  padding: 8px;
  font-size: 15px;
  word-break: break-all;
`;

const StyledContent = styled.div`
  padding: 24px 12px;
  color: ${colors.whiteGray};
`;

const StyledTextarea = styled.div`
  word-break: break-all;
`;

const StyledInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  font-size: 12px;
`;

const StyledName = styled.span`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  background-color: ${colors.gray4};
  font-size: 14px;
  line-height: 1;

  &::after {
    content: '님';
    padding-left: 4px;
    font-size: 12px;
    color: ${colors.gray5};
  }
`;

const StyledUnit = styled.span`
  color: ${colors.gray5};
`;

const StyledButton = styled.a``;

export default ArticleView;
