import axios from "axios";
import { useEffect, useState } from "react";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import { Link, useHistory, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { isSuccess } from "../utilites/validates/httpValidation";
import "./pagination.css";
import qs from "qs";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setCurrentPage(query.page || 1);
    (async function () {
      try {
        const res = await axios.get(
          `/api/v1/articles?currentPage=${query.page || 1}`,
        );
        if (isSuccess(res)) {
          setArticles(res.data.content.items);
          setTotalPages(res.data.content.totalPages);
          setTotalArticles(res.data.content.totalElements);
          return;
        }
        alert(res.data.message);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location]);

  const onPageChange = (currentPage) => {
    history.push(`/articles?page=${currentPage.selected + 1}`);
  };

  return (
    <>
      <div>
        <h1>안녕하세요! 게시판입니다.</h1>
        <button
          onClick={() => {
            history.push("/article-write");
          }}
        >
          글쓰기
        </button>
      </div>
      {isEmpty(articles) ||
        (isEmpty(totalArticles) && <p>등록된 게시글이 없습니다.</p>)}
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
          {/*FIXME success 이후 아티클 랭스 체크*/}
          {!isEmpty(articles) &&
            articles.map((article) => (
              <tr key={article.article_id}>
                <td>{article.article_id}</td>
                <td>
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                </td>
                <td>{article.created_at}</td>
                <td>{article.author}</td>
                <td>0</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!isEmpty(articles) && (
        <ReactPaginate
          className="color"
          activeClassName="active"
          previousClassName="li"
          nextClassName="li"
          pageClassName="li"
          pageCount={totalPages}
          previousLabel="‹ 이전"
          nextLabel="다음 ›"
          onPageChange={onPageChange}
          page={currentPage - 1}
        />
      )}
    </>
  );
}
