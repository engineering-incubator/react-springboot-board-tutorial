import React, { useState, useEffect } from 'react';
import Template from '../../components/common/Template';
import ArticleItem from '../../components/article/ArticleItem';
import { getArticleList } from '../../api/articleApi';
import { Link } from 'react-router-dom';
import WritingButton from '../../components/article/WritingButton';
import ReactPaginate from 'react-paginate';
import '../../styles/pagination.css';
const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
	const itemsPerPage = 5;
  // FIXME useHook 으로 추상화
  useEffect(() => {
    async function getList() {
      const data = await getArticleList();
			setArticleList(data.items);
			setPageCount(data.totalPages)
    }
    console.log(articleList);
    getList();
  }, []);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(articleList.slice(itemOffset, endOffset));
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
      <WritingButton
        onClick={() => (document.location.href = '/article/create')}
      />
    </>
  );
};
export default ArticleList;
