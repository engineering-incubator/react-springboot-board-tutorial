import { useQuery } from 'react-query';
import { fetchClient } from '../api';
import { ArticleItemType } from './useArticles';

const useArticleItem = (articleId: string) => {
  const url = `/api/v1/articles/${articleId}`;
  const fetchArticleItem = () =>
    fetchClient({
      method: 'get',
      url,
    });

  return useQuery([`articleItem/${articleId}`], (): Promise<ArticleItemType> => fetchArticleItem());
};

export default useArticleItem;
