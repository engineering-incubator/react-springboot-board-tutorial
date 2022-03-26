import { Link } from "react-router-dom";

export default function gateway() {
  return (
    <>
      <div>
        <h1>안녕하세요! 게시판입니다.</h1>
        <button>글쓰기</button>
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
          <tr>
            <th>1</th>
            <Link path="/article/1">
              <th>제목이당</th>
            </Link>
            <th>2022-03-26</th>
            <th>김모찌</th>
            <th>1</th>
          </tr>
          <tr>
            <th>2</th>
            <th>제목2이당</th>
            <th>2022-03-26</th>
            <th>아이린</th>
            <th>1</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
