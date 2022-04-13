import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Pagination from "../components/pagination";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import { isSuccess } from "../utilites/validates/httpValidation";
import "./pagination.css";

export default function ArticleList() {
  const history = useHistory();
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  // TODO pagination state -> useReducer 로 통합(custom hook으로 분리하면 좀더 좋을 듯.
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const onPageChange = (currentPage) => {
    history.push(`/articles?page=${currentPage.selected + 1}`);
  };
  const onMoveWritePage = () => history.push("/article-write");

  useEffect(() => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const page = Number(query.page) || 1;
    setCurrentPage(page);
    (async function () {
      try {
        const res = await axios.get(`/api/v1/articles?currentPage=${page}`);
        if (!isSuccess(res)) {
          alert(res.data.message);
          return;
        }

        setArticles(res.data.content.items);
        setTotalPages(res.data.content.totalPages);
        setTotalArticles(res.data.content.totalElements);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location]);

  return (
    <>
      <div>
        <h1>안녕하세요! 게시판입니다.</h1>
        <button onClick={onMoveWritePage}>글쓰기</button>
      </div>
      {(isEmpty(articles) || isEmpty(totalArticles)) && (
        <p>등록된 게시글이 없습니다.</p>
      )}
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
          {!isEmpty(articles) &&
            articles.map((article) => (
              <tr key={article.article_id}>
                <td>{article.article_id}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/articles/${article.article_id}`,
                      state: { page: currentPage },
                    }}
                  >
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
        <Pagination
          pageCount={totalPages}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
