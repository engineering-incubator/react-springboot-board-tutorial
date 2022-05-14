import qs from "qs";
import { useEffect, useReducer, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Pagination from "../components/pagination";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import { isSuccess } from "../utilites/validates/httpValidation";
import "./pagination.css";
import { requester } from "../configures/requestConfigures";

export default function ArticleList() {
  const history = useHistory();
  const location = useLocation();
  const [articles, setArticles] = useState([]);

  // TODO pagination state -> useReducer 로 통합(custom hook으로 분리하면 좀더 좋을 듯.
  const reducer = (state, action) => {
    if (action.type === "totalPages") {
      return { ...state, totalPages: action.value };
    }
    if (action.type === "currentPage") {
      return { ...state, currentPage: action.value };
    } else {
      return { ...state, totalArticles: action.value };
    }
  };

  const [paginationState, paginationDispatch] = useReducer(reducer, {
    totalPages: 1,
    currentPage: 1,
    totalArticles: 0,
  });

  const onPaginationChange = (type, value) => {
    paginationDispatch({ type, value });
  };

  const onPageChange = (currentPage) => {
    history.push(`/articles?page=${currentPage.selected + 1}`);
  };

  const onMoveWritePage = () => history.push("/article-write");

  useEffect(() => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const page = Number(query.page) || 1;
    onPaginationChange("currentPage", page);
    (async function () {
      try {
        const res = await requester.get(`/v1/articles?currentPage=${page}`);
        if (!isSuccess(res)) {
          alert(res.data.message);
          return;
        }
        setArticles(res.data.content.items);
        onPaginationChange("totalPages", res.data.content.totalPages);
        onPaginationChange("totalArticles", res.data.content.totalElements);
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
      {(isEmpty(articles) || isEmpty(paginationState.totalArticles)) && (
        <p>등록된 게시글이 없습니다.</p>
      )}
      {!isEmpty(articles) && !isEmpty(paginationState.totalArticles) && (
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
            {articles.map((article) => (
              <tr key={article.article_id}>
                <td>{article.article_id}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/articles/${article.article_id}`,
                      state: { page: paginationState.currentPage },
                    }}
                  >
                    {article.title}
                  </Link>
                </td>
                <td>{article.created_at}</td>
                <td>{article.author}</td>
                <td>{article.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isEmpty(articles) && !isEmpty(paginationState.totalArticles) && (
        <Pagination
          pageCount={paginationState.totalPages}
          onPageChange={onPageChange}
          currentPage={paginationState.currentPage}
        />
      )}
    </>
  );
}
