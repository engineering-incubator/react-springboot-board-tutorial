import { useQuery } from 'react-query';
import { ExternalResponse } from '../../@types/response';
import { requestArticleItem } from '../../api';
import { ArticleItemType } from './useArticles';

const useArticleItem = (articleId: number) => {
  const fetchArticleItem = () => requestArticleItem(articleId);

  return useQuery(
    [`articleItem/${articleId}`],
    (): Promise<ExternalResponse<ArticleItemType>> => fetchArticleItem(),
  );
};

export default useArticleItem;
