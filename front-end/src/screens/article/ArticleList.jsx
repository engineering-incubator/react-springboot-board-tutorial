import React, { useEffect, useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import { getArticleList } from '../../api/articleApi';
import ArticleItem from '../../components/article/ArticleItem';
import FloatingButton from '../../components/article/WritingButton';
import Template from '../../components/common/Template';
import { useFetchArticleList } from '../../api/hooks/useFetchArticle';
import '../../styles/pagination.css';
const ArticleList = () => {
  const articleList = useFetchArticleList();
  const [page, setPage] = useState(1);
 const handlePageChange = (page) => { setPage(page); console.log(page); };


  return (
    <>
      <Template title="게시글 둘러보기">
        {articleList.map((article) => (
          <Link to={`/article/` + article.article_id} key={article.article_id}>
            <ArticleItem data={article} />
          </Link>
        ))}
      </Template>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={handlePageChange}
      />

      <FloatingButton
        text="홈"
        onClick={() => (document.location.href = '/')}
        style={{ bottom: 160 }}
      />
      <FloatingButton
        text="글목록"
        onClick={() => (document.location.href = '/article')}
        style={{ bottom: 80 }}
      />
      <FloatingButton
        text="글쓰기"
        onClick={() => (document.location.href = '/article/create')}
      />
    </>
  );
};
export default ArticleList;
