import qs from "qs";
import { useEffect, useReducer, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Pagination from "../components/pagination";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import { isSuccess } from "../utilites/validates/httpValidation";
import "./pagination.css";
import { requester } from "../configures/requestConfigures";
import styled from "styled-components";
import { Button, Container, Title } from "../components/style";
import { articleDate } from "../utilites/cast";

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

  const Table = styled.table`
    border-collapse: collapse;
  `;
  const TableHeaderBorder = styled.th`
    border-bottom: 1px solid #ccc;
    padding: 16px 0;
    text-align: left;
    color: #202a43;
  `;
  const TableBorder = styled.td`
    border-bottom: 1px solid #eee;
    padding: 16px 0;
    text-align: left;
  `;

  return (
    <Container>
      <div>
        <Title>&#128221; 게시판</Title>
        <Button onClick={onMoveWritePage}>글쓰기</Button>
      </div>
      {(isEmpty(articles) || isEmpty(paginationState.totalArticles)) && (
        <p>등록된 게시글이 없습니다.</p>
      )}
      {!isEmpty(articles) && !isEmpty(paginationState.totalArticles) && (
        <Table>
          <thead>
            <tr>
              <TableHeaderBorder>게시글 번호</TableHeaderBorder>
              <TableHeaderBorder>제목</TableHeaderBorder>
              <TableHeaderBorder>날짜</TableHeaderBorder>
              <TableHeaderBorder>작성자</TableHeaderBorder>
              <TableHeaderBorder>조회수</TableHeaderBorder>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.article_id}>
                <TableBorder>{article.article_id}</TableBorder>
                <TableBorder>
                  <Link
                    to={{
                      pathname: `/articles/${article.article_id}`,
                      state: { page: paginationState.currentPage },
                    }}
                  >
                    {article.title}
                  </Link>
                </TableBorder>
                <TableBorder>{articleDate(article.created_at)}</TableBorder>
                <TableBorder>{article.author}</TableBorder>
                <TableBorder>{article.views}</TableBorder>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!isEmpty(articles) && !isEmpty(paginationState.totalArticles) && (
        <Pagination
          pageCount={paginationState.totalPages}
          onPageChange={onPageChange}
          currentPage={paginationState.currentPage}
        />
      )}
    </Container>
  );
}
