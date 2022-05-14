import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

export default function Navigation() {
  const Navigation = styled.div`
    position: top;
    padding: 0px 32px;
  `;
  const MyLink = styled(Link)`
    text-decoration: none;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
  `;
  const Logo = styled.h3`
    font-weight: 700;
    letter-spacing: -0.2px;
    text-align: left;
    color: #202a43;
  `;

  return (
    <Navigation>
      <MyLink to="/">
        <Logo>Bulletin Board</Logo>
      </MyLink>
      <ul>
        <li>
          <MyLink to="/articles">게시판</MyLink>
        </li>
        <li>
          <MyLink to="/signup">회원가입</MyLink>
        </li>
        <li>
          <MyLink to="/login">로그인</MyLink>
        </li>
      </ul>
    </Navigation>
  );
}
