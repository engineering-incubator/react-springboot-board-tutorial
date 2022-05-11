import { useQuery } from 'react-query';
import { ExternalResponse } from '../../@types/response';
import { requestArticleItem } from '../../api';
import { ArticleItemType } from './useArticles';

const useArticleItem = (articleId: string) => {
  // FIXME undefinde 일때 early return ?
  const getArticleItem = () => requestArticleItem(articleId || '');

  return useQuery(
    [`articleItem/${articleId}`],
    (): Promise<ExternalResponse<ArticleItemType>> => getArticleItem(),
    {
      enabled: !!articleId,
    },
  );
};

export default useArticleItem;
