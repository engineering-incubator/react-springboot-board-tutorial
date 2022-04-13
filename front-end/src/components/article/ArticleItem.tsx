import React from 'react';
import { ArticleItemType } from '../../hooks/useArticles';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import minMax from 'dayjs/plugin/minMax';
import { StyledArticleRow } from '../../styles/common';
dayjs.extend(minMax);

const ArticleItem = ({ data }: { data: ArticleItemType }) => {
  const { article_id, title, author, created_at, modified_at } = data;
  const date = dayjs.max([dayjs(created_at), dayjs(modified_at)]);
  const newDate = date.format('YY-MM-DD HH:mm');

  return (
    <StyledArticleRow role="row">
      <span role="cell">{article_id}</span>
      <span role="cell">
        <a href={`article/${article_id}`}>{title}</a>
      </span>
      <span role="cell">{author}</span>
      <span role="cell">{newDate}</span>
    </StyledArticleRow>
  );
};

export default ArticleItem;
