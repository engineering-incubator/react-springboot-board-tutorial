import React from 'react'
import { Route, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "../../screens/Home";
import SignUp from "../../screens/auth/SignUp";
import SignIn from "../../screens/auth/SignIn";
import ArticleList from "../../screens/article/ArticleList";
import Article from "../../screens/article/Article";
const Header = styled.div``

const Category = styled.div`
  color: #000;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  padding: 5px 15px;
  width: auto;
  display: inline-block;
  margin: 10px;
`

const Navigation = () => {
  return (
    <>
      <Header>
        <Category>
          <Link to="/">홈으로 이동</Link>
        </Category>
        <Category>
          <Link to="/signUp">회원가입</Link>
        </Category>
        <Category>
          <Link to="/signIn">로그인</Link>
        </Category>
        <Category>
          <Link to="/article">게시글 목록</Link>
        </Category>
        <Category>
          <Link to="/article/:article_id">게시글 상세</Link>
        </Category>
      </Header>
      <Route path="/" element={Home} exact></Route>
      <Route path="/signUp" component={SignUp} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/article" component={ArticleList} />
      <Route path="/article/:article_id" component={Article} />
    </>
  )
}

export default Navigation
