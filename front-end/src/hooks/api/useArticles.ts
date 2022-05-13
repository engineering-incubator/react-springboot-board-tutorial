import { useQuery } from 'react-query';
import { ExternalResponse } from '../../@types/response';
import { requestArticles } from '../../api';

export interface ArticleItemType {
  article_id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  modified_at: string;
}

export interface ArticleListType {
  items: ArticleItemType[];
  totalPages: number;
  currentPage: number;
  size: number;
  totalElements: number;
}

export interface ArticlesParams {
  currentPage: number;
  size: number;
}

const useArticles = (params: ArticlesParams) => {
  const { currentPage, size } = params;
  const getArticleList = (): Promise<ExternalResponse<ArticleListType>> =>
    requestArticles({
      currentPage,
      size,
    });

  return useQuery(['articles', currentPage, size], () => getArticleList(), {
    staleTime: 0,
    cacheTime: 0,
  });
};

export default useArticles;
