import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

export default function Navigation() {
  const Container = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    padding: 0 32px;
    background: #fff;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  `;

  const FlexItem = styled.div`
    margin-right: 60px;
    height: 52px;
  `;
  const NavigateLink = styled(Link)`
    color: #707991;
    text-decoration: none;
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
    &:hover,
    &:focus {
      color: #ff334b;
      font-weight: 700;
    }
    margin-right: 28px;
  `;
  const Logo = styled.h3`
    margin: 0 auto;
    font-weight: 900;
    letter-spacing: -0.2px;
    text-align: left;
    color: #202a43;
  `;

  const List = styled.ul`
    list-style: none;
    display: flex;
    margin: 0 auto;
    padding: 0;
  `;

  return (
    <Container>
      <FlexItem>
        <NavigateLink to="/">
          <Logo>TOPIO</Logo>
        </NavigateLink>
      </FlexItem>
      <FlexItem>
        <List>
          <NavigateLink to="/articles">게시판</NavigateLink>
          <NavigateLink to="/signup">회원가입</NavigateLink>
          <NavigateLink to="/login">로그인</NavigateLink>
        </List>
      </FlexItem>
    </Container>
  );
}
