import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Articles from './components/article/Articles';
import ArticleView from './components/article/ArticleView';
import SignupContainer from './components/signup/Signup.Container';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/articles" element={<Articles />} />
        {/* NOTE article id 를 param 으로 넘길지 path로 넘길지.. */}
        <Route path="/article/:article_id" element={<ArticleView />} />
        <Route path="/signup" element={<SignupContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
