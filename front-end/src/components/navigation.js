import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { Container } from "./style";

export default function Navigation() {
  const FlexItem = styled.div`
    margin-right: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  const Logo = styled.h3`
    font-weight: 900;
    letter-spacing: -0.2px;
    text-align: left;
    color: #202a43;
  `;

  const List = styled.ul`
    list-style: none;
    display: inline-block;
    margin: 0;
    padding: 0;
  `;

  const ListItem = styled.li`
    float: left;
    margin-right: 20px;
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
          <ListItem>
            <NavigateLink to="/articles">게시판</NavigateLink>
          </ListItem>
          <ListItem>
            <NavigateLink to="/signup">회원가입</NavigateLink>
          </ListItem>
          <ListItem>
            <NavigateLink to="/login">로그인</NavigateLink>
          </ListItem>
        </List>
      </FlexItem>
    </Container>
  );
}
