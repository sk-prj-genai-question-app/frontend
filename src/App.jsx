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

import ProtectedRoute from './components/common/ProtectedRoute';

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
              {/* 로그인 필요 페이지들은 ProtectedRoute로 감싸기 */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/review"
                element={
                  <ProtectedRoute>
                    <ReviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/generate-problem"
                element={
                  <ProtectedRoute>
                    <GenerateProblemPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/solve-problem"
                element={
                  <ProtectedRoute>
                    <SolveProblemPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/custom"
                element={
                  <ProtectedRoute>
                    <CustomPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <ProtectedRoute>
                    <SupportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wrong-note"
                element={
                  <ProtectedRoute>
                    <WrongNotePage />
                  </ProtectedRoute>
                }
              />
              {/* 로그인, 회원가입 페이지는 보호 안 함 */}
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
