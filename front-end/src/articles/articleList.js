import axios from "axios";
import { useEffect, useState } from "react";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import { Link, useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function ArticleList() {
  const [articles, setArticles] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  const itemsCountPerPage = 10;
  const offset = currentPage * itemsCountPerPage;
  // const currentPageData = articles.slice(offset, offset + itemsCountPerPage);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get("/api/v1/articles");
        if (res.data.code === "SUCCESS") {
          return setArticles(res.data.content);
        }
        return alert(res.data.message);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handlePageClick = () => {
    setCurrentPage(2);
  };

  return (
    <>
      <div>
        <h1>안녕하세요! 게시판입니다.</h1>
        <button
          onClick={() => {
            history.push("/article/post");
          }}
        >
          글쓰기
        </button>
      </div>
      {/*{!isEmpty(articles) && (*/}
      {/*  <ReactPaginate*/}
      {/*    itemsCountPerPage={itemsCountPerPage}*/}
      {/*    totalItemsCount={articles.length}*/}
      {/*    pageRangeDisplayed={10}*/}
      {/*    prevPageText="‹ 이전"*/}
      {/*    nextPageText="다음 ›"*/}
      {/*    onChange={handlePageClick}*/}
      {/*  />*/}
      {/*)}*/}
      <table>
        <thead>
          <tr>
            <th>게시글 번호</th>
            <th>제목</th>
            <th>날짜</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {/*{!isEmpty(articles) &&*/}
          {/*  currentPageData.map((article) => (*/}
          {/*    <tr key={article.article_id}>*/}
          {/*      <td>{article.article_id}</td>*/}
          {/*      <td>*/}
          {/*        <Link to={`/article/${article.article_id}`}>*/}
          {/*          {article.title}*/}
          {/*        </Link>*/}
          {/*      </td>*/}
          {/*      <td>{article.modified_at}</td>*/}
          {/*      <td>김모찌</td>*/}
          {/*      <td>0</td>*/}
          {/*    </tr>*/}
          {/*  ))}*/}
        </tbody>
      </table>
      {isEmpty(articles) && <h5>불러오는 중입니다...</h5>}
    </>
  );
}
