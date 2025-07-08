import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/bar/Sidebar';
import TopBar from './components/bar/TopBar';

import ReviewPage from './pages/ReviewPage';
import GenerateProblemPage from './pages/problem/GenerateProblemPage';
import SolveProblemPage from './pages/problem/SolveProblemPage';
import ResultPage from './pages/problem/ResultPage'; // ✅ 추가

import CustomPage from './pages/CustomPage';
import SupportPage from './pages/SupportPage';
import SettingsPage from './pages/SettingsPage';
import WrongNotePage from './pages/wrongnote/WrongNotePage';
import MyPage from './pages/home/MyPage';
import LoginRegisterPage from './pages/login/LoginRegisterPage';

import './index.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <TopBar />
          <div className="page-content">
            <Routes>
              {/* dev/1.0.1의 라우트들 */}
              <Route path="/" element={<MyPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/generate-problem" element={<GenerateProblemPage />} />
              <Route path="/solve-problem" element={<SolveProblemPage />} />
              <Route path="/result" element={<ResultPage />} /> {/* ✅ 결과 페이지 경로 추가 */}
              <Route path="/custom" element={<CustomPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/wrong-note" element={<WrongNotePage />} />
              <Route path="/login" element={<LoginRegisterPage />} />
              <Route path="/register" element={<LoginRegisterPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
