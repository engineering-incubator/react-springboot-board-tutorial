import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { getArticleList } from "../../api/articleApi";
import ArticleItem from "../../components/article/ArticleItem";
import FloatingButton from "../../components/article/WritingButton";
import Template from "../../components/common/Template";
import { useFetchArticleList } from '../../api/hooks/useFetchArticle';
import "../../styles/pagination.css";

const ArticleList = () => {
  const articleList = useFetchArticleList();
  const itemsPerPage = 5;

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(articleList.slice(itemOffset, endOffset));
    setPageCount(articleList.totalPages);
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % articleList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Template title="게시글 둘러보기">
        {articleList.map((article) => (
          <Link to={`/article/` + article.article_id} key={article.article_id}>
            <ArticleItem data={article} />
          </Link>
        ))}
      </Template>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
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
