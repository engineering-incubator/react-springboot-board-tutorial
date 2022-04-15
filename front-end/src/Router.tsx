import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Articles from './pages/Articles';
import ArticleView from './pages/ArticleView';
import ArticlePost from './pages/ArticlePost';
import SignupProvider from './provider/SignupProvider';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:articleNumber" element={<ArticleView />} />
        <Route path="/article/write" element={<ArticlePost />} />
        <Route path="/signup" element={<SignupProvider />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
