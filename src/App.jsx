import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/bar/Sidebar';
import TopBar from './components/bar/TopBar';

import ReviewPage from './pages/ReviewPage';
import GenerateProblemPage from './pages/problem/GenerateProblemPage';
import SolveProblemPage from './pages/problem/SolveProblemPage';
import CustomPage from './pages/CustomPage';
import SupportPage from './pages/SupportPage';
import SettingsPage from './pages/SettingsPage';
import WrongNotePage from './pages/wrongnote/WrongNotePage';
import MyPage from './pages/home/MyPage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/login/RegisterPage';

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
              <Route path="/custom" element={<CustomPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/wrong-note" element={<WrongNotePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
