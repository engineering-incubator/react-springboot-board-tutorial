import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle, getArticleList, getTotalArticleList } from '../../api/articleApi';
import { isFailureStatus } from '../config/status-code.config'
import { useHistory } from "react-router-dom";


export function useFetchArticle() {
  const params = useParams();
	const history = useHistory();
  const [article, setArticle] = useState({});
  useEffect(function fetchArticle() {
    (async function getItem() {
      const item = await getArticle(params.article_id);
      if (isFailureStatus(item.code)) { alert('로그인이 필요합니다.'); history.push("/signIn");}
      else  setArticle(item.content); 
    })();
  }, [params.article_id]);

  return article;
}

export function useFetchArticleList(currentPage, size) {
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    (async function getList() {
      const response = await getArticleList(currentPage, size);
      if (!response.isSuccess) {
        return;
      }

      setArticleList(response.data);
    })();
  }, [setArticleList, currentPage]);

  return articleList;
}

export function useFetchTotalArticleList() {
  const [totalArticleList, setTotalArticleList] = useState([]);
  useEffect(() => {
    (async function getList() {
      const response = await getTotalArticleList();
      if (!response.isSuccess) {
        return;
      }
      setTotalArticleList(response.data);
    })();
  }, [setTotalArticleList]);
  console.log(totalArticleList)

  return totalArticleList;
}
