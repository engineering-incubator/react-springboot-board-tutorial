import React from 'react';
import { fetchClient } from '../api';
import { useQuery } from 'react-query';

export interface ArticleItemType {
  article_id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  modified_at: string;
}

interface ArticleListType {
  code: string;
  content: {
    items: ArticleItemType[];
    totlaPages: number;
    currentPage: number;
    size: number;
    totalElements: number;
  };
  message: string;
}

interface ArticlesParams {
  currentPage: number;
  size: number;
}

const useArticles = (params: ArticlesParams) => {
  const { currentPage, size } = params;
  const url = '/v1/articles';
  const fetchArticles = (): Promise<ArticleListType> =>
    fetchClient({
      method: 'get',
      url,
      params: {
        currentPage,
        size,
      },
    });

  return useQuery(['articles', currentPage, size], () => fetchArticles(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export default useArticles;
