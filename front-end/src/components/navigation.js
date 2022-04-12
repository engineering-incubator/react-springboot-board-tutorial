import { Link } from "react-router-dom";
import React from "react";

export default function Navigation() {
  return (
    <>
      <h1>네비게이션</h1>
      <ol>
        <li>
          <Link to="/articles?page=1">게시판</Link>
        </li>
        <li>
          <Link to="/signup">회원가입</Link>
        </li>
        <li>
          <Link to="/login">로그인</Link>
        </li>
      </ol>
    </>
  );
}