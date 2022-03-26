import { Link } from "react-router-dom";
import React from "react";

export default function Navigation() {
  return (
    <>
      <h1>로고</h1>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/signup">회원가입</Link>
        </li>
        <li>
          <Link to="/login">로그인</Link>
        </li>
      </ul>
    </>
  );
}
