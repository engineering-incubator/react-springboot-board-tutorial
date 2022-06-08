import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Home from '../../screens/Home';
import SignUp from '../../screens/auth/SignUp';
import SignIn from '../../screens/auth/SignIn';
import ArticleList from '../../screens/article/ArticleList';
import Article from '../../screens/article/Article';
import UpdateArticle from '../../screens/article/UpdateArticle';
import CreateArticle from '../../screens/article/CreateArticle';

const Nav = styled.div`
  margin: 0 auto;
  width: 450px;
`;
const Category = styled.div`
  color: #000;
  background: #000;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  padding: 5px 15px;
  width: auto;
  display: inline-block;
  margin: 10px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const Navigation = () => {
  return (
    <>
      <Nav>
        <Category>
          <StyledLink to="/">Home</StyledLink>
        </Category>
        <Category>
          <StyledLink to="/signUp">회원가입</StyledLink>
        </Category>
        <Category>
          <StyledLink to="/signIn">로그인</StyledLink>
        </Category>
        <Category>
          <StyledLink to="/article">게시글로 이동</StyledLink>
        </Category>
      </Nav>
      <Route path="/" component={Home} exact></Route>
      <Route path="/signUp" component={SignUp} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/article" component={ArticleList} exact />
      <Route path="/article/update/:article_id" component={UpdateArticle} />
      <Route path="/article/create" component={CreateArticle} />
      <Route path="/article/detail/:article_id" component={Article} exact />
    </>
  );
};

export default Navigation;
