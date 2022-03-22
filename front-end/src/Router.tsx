import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './components/board/Board';
import SignUp from './components/signup/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
