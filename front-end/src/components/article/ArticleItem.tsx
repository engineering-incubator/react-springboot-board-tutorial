import React, { useMemo } from 'react';
import { ArticleItemType } from '../../hooks/useArticles';
import styled from '@emotion/styled';
import { StyledArticleRow } from '../../styles/common';

const ArticleItem = ({ data }: { data: ArticleItemType }) => {
  const { article_id, title, author, created_at, modified_at } = data;
  const slicedModifiedAt = useMemo(() => modified_at.slice(2, 10), [modified_at]);

  return (
    <StyledArticleRow role="row">
      <span role="cell">{article_id}</span>
      <span role="cell">
        <a href={`article/${article_id}`}>{title}</a>
      </span>
      <span role="cell">{author}</span>
      <span role="cell">{slicedModifiedAt}</span>
    </StyledArticleRow>
  );
};

export default ArticleItem;
