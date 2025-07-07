import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegisterPage from './pages/login/LoginRegisterPage';
import JLPTQuestionPage from './pages/question/JLPTQuestionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JLPTQuestionPage />} />
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/question" element={<JLPTQuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
