import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import HomePage from './pages/HomePage';
import ReviewPage from './pages/ReviewPage';
import N1Page from './pages/N1Page';
import N2Page from './pages/N2Page';
import N3Page from './pages/N3Page';
import CustomPage from './pages/CustomPage';
import SupportPage from './pages/SupportPage';
import SettingsPage from './pages/SettingsPage';
import WrongNotePage from './pages/WrongNotePage';
import MyPage from './pages/MyPage';
import LoginRegisterPage from './pages/login/LoginRegisterPage'; // feat/6-login-register-question에서 추가

import './index.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/n1" element={<N1Page />} />
            <Route path="/n2" element={<N2Page />} />
            <Route path="/n3" element={<N3Page />} />
            <Route path="/custom" element={<CustomPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/wrong-note" element={<WrongNotePage />} />
            <Route path="/mypage" element={<MyPage />} />
            {/* 로그인/회원가입 페이지 라우트 추가. 필요에 따라 경로를 조정하세요. */}
            <Route path="/login" element={<LoginRegisterPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;