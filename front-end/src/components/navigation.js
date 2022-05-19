import React from "react";
import styled from "styled-components";
import theme from "./style/theme";
import { NavigateLink } from "./style/globalStyle";

export default function Navigation() {
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 0;
    width: 100%;
    padding: 0 32px;
    background: ${theme.colors.white};
    box-shadow: 0 2px 20px ${theme.colors.shadow};
    z-index: 900;
  `;
  const Logo = styled.div`
    display: table-cell;
    height: 64px;
    margin: 0;
    padding-right: 80px;
    color: ${theme.colors.gray};
    font-size: 20px;
    font-weight: ${theme.fontWeight.black};
    letter-spacing: -0.2px;
    text-align: left;
    vertical-align: middle;
  `;
  const Menu = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
  `;
  const MenuItem = styled.li`
    display: table-cell;
    height: 64px;
    padding-right: 40px;
    color: ${theme.colors.lightGray};
    vertical-align: middle;
    &:hover {
    color: ${theme.colors.red};
  `;

  return (
    <Container>
      <NavigateLink to="/" colors={"red"}>
        <Logo>TOPIO</Logo>
      </NavigateLink>
      <Menu>
        <NavigateLink to="/articles">
          <MenuItem>게시판</MenuItem>
        </NavigateLink>
        <NavigateLink to="/signup">
          <MenuItem>회원가입</MenuItem>
        </NavigateLink>
        <NavigateLink to="/login">
          <MenuItem>로그인</MenuItem>
        </NavigateLink>
      </Menu>
    </Container>
  );
}
