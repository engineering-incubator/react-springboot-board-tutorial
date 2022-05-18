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
    z-index: 900;
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
  `;
  const Logo = styled.div`
    display: table-cell;
    vertical-align: middle;
    margin: 0;
    padding-right: 90px;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.2px;
    text-align: left;
    color: #202a43;
    height: 64px;
  `;

  const List = styled.ul`
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  `;
  const ListItem = styled.li`
    height: 64px;
    display: table-cell;
    vertical-align: middle;
    padding-right: 36px;
  `;

  return (
    <Container>
      <NavigateLink to="/">
        <Logo>TOPIO</Logo>
      </NavigateLink>
      <List>
        <NavigateLink to="/articles">
          <ListItem>게시판</ListItem>
        </NavigateLink>
        <NavigateLink to="/signup">
          <ListItem>회원가입</ListItem>
        </NavigateLink>
        <NavigateLink to="/login">
          <ListItem>로그인</ListItem>
        </NavigateLink>
      </List>
    </Container>
  );
}
