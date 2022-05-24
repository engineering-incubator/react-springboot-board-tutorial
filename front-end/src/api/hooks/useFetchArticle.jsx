import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle, getArticleList } from '../../api/articleApi';
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
      else  setArticle(item); 
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
