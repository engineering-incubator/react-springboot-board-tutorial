import axios from "axios";
import { useEffect, useState } from "react";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import { Link, useHistory } from "react-router-dom";

export default function Gateway() {
  const [articles, setArticles] = useState();
  const history = useHistory();

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get("/api/v1/article");
        if (res.data.code === "SUCCESS") {
          return setArticles(res.data.content);
        }
        return alert(res.data.message);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div>
        <h1>안녕하세요! 게시판입니다.</h1>
        <button
          onClick={() => {
            history.push("/login");
          }}
        >
          글쓰기
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
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
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                </td>
                <td>{article.created_at}</td>
                <td>김모찌</td>
                <td>0</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
