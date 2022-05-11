import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Articles from './pages/Articles';
import ArticleView from './pages/ArticleView';
import ArticlePost from './pages/ArticlePost';
import SignupProvider from './provider/SignupProvider';
import { LANDING_PATH, LANDING_PATH_NAME } from './config';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${LANDING_PATH[LANDING_PATH_NAME.ARTICLES]}`} element={<Articles />} />
        <Route
          path={`${LANDING_PATH[LANDING_PATH_NAME.ARTICLE]}/:articleId`}
          element={<ArticleView />}
        />
        <Route
          path={`${LANDING_PATH[LANDING_PATH_NAME.ARTICLE_WRITE]}`}
          element={<ArticlePost />}
        />
        <Route
          path={`${LANDING_PATH[LANDING_PATH_NAME.ARTICLE_WRITE]}/:articleId`}
          element={<ArticlePost />}
        />
        <Route path={`${LANDING_PATH[LANDING_PATH_NAME.SIGNUP]}`} element={<SignupProvider />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
