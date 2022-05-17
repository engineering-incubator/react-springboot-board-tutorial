import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle, getArticleList } from '../../api/articleApi';

export function useFetchArticle() {
   const params = useParams();
  const [article, setArticle] = useState({});
  useEffect(function fetchArticle() {
    (async function getItem() {
      const item = await getArticle(params.article_id);
      setArticle(item);
    })();
  }, []);

  return article;
}

export function useFetchArticleList() {
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    (async function getList() {
      const response = await getArticleList();
      if (!response.isSuccess) {
        return;
      }

      setArticleList(response.data);
    })();
  }, []);

  return articleList;
}
