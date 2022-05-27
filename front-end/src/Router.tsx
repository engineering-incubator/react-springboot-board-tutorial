import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Articles from './pages/Articles';
import ArticleView from './pages/ArticleView';
import ArticlePost from './pages/ArticlePost';
import Signin from './pages/Signin';
import SignupProvider from './provider/SignupProvider';
import Header from './components/common/Header';

const Router = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/articles" element={<Articles />} />
      <Route path="/article/:articleId" element={<ArticleView />} />
      <Route path="/article/write" element={<ArticlePost />} />
      <Route path="/article/write/:articleId" element={<ArticlePost />} />
      <Route path="/signup" element={<SignupProvider />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
