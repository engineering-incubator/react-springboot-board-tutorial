import React from 'react';
import { useParams } from 'react-router-dom';
import useArticleItem from '../../hooks/useArticleItem';

const ArticleView = () => {
  const { article_id = '1' } = useParams();
  const { data, isSuccess, isLoading } = useArticleItem(article_id);

  return <div>article</div>;
};

export default ArticleView;
