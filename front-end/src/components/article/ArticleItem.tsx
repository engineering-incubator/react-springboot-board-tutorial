import React from 'react';
import { ArticleItemType } from '../../hooks/api/useArticles';
import styled from '@emotion/styled';
import { StyledCommonBlind } from '../../styles/common';
import { colors } from '../../styles/variables';
import { generateDate } from '../../utils';
import { LANDING_PATH, LANDING_PATH_NAME } from 'src/config';

const ArticleItem = ({ data }: { data: ArticleItemType }) => {
  const { article_id, title, author, created_at, modified_at } = data;

  return (
    <StyledArticleRow href={`${LANDING_PATH[LANDING_PATH_NAME.ARTICLE]}/${article_id}`} role="row">
      <StyledCommonBlind as={'span'} role="cell">
        {article_id}
      </StyledCommonBlind>
      <StyledArticleTitle role="cell">{title}</StyledArticleTitle>
      <StyledArticleInformation role="cell">
        <StyledArticleInformationUnit>{generateDate(modified_at)}</StyledArticleInformationUnit>
      </StyledArticleInformation>
      <StyledArticleName role="cell">{author}</StyledArticleName>
    </StyledArticleRow>
  );
};

const StyledArticleRow = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 8px 12px;
  border: 1px solid ${colors.gray3};
  border-bottom: none;
  box-sizing: border-box;

  &:nth-last-of-type(1) {
    border-bottom: 1px solid ${colors.gray3};
  }
`;

const StyledArticleTitle = styled.span`
  flex: 1 0 100%;
  color: ${colors.whiteGray};
  word-break: break-all;
`;

const StyledArticleInformation = styled.span`
  color: #888;
  font-size: 11px;
`;

const StyledArticleInformationUnit = styled.span`
  & + &::before {
    content: '|';
    display: inline-flex;
    padding-right: 8px;
    margin-left: 8px;
  }
`;

const StyledArticleName = styled.span`
  font-size: 11px;
  color: ${colors.whiteGray};
`;

export default ArticleItem;
