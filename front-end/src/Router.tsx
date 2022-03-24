import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from '_/components/board/Board';
import SignupContainer from '_/components/signup/Signup.Container';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/signup" element={<SignupContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
