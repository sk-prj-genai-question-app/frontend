import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Sidebar from './components/bar/Sidebar';
import TopBar from './components/bar/TopBar';

import ReviewPage from './pages/ReviewPage';
import GenerateProblemPage from './pages/problem/GenerateProblemPage';
import SolveProblemPage from './pages/problem/SolveProblemPage';
import ResultPage from './pages/problem/ResultPage';
import CustomPage from './pages/CustomPage';
import SupportPage from './pages/SupportPage';
import SettingsPage from './pages/SettingsPage';
import WrongNotePage from './pages/wrongnote/WrongNotePage';
import MyPage from './pages/home/MyPage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/login/RegisterPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import ProfileEditPage from './pages/profile/ProfileEditPage';
import RetryProblemPage from './pages/problem/RetryProblemPage';

import './index.css';

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      {/* LayoutWrapper를 사용하여 페이지 레이아웃을 관리 (이전 병합 결과 유지) */}
      <LayoutWrapper>
        <Routes>
          {/* ProtectedRoute로 감싸진 라우트들 (이전 병합 결과 유지) */}
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
          {/* ✅ ResultPage 라우트 추가 및 ProtectedRoute로 감싸기 */}
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <ResultPage />
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

          <Route
            path="/profile-edit"
            element={
              <ProtectedRoute>
                <ProfileEditPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/retry-problem/:id"
            element={
              <ProtectedRoute>
                <RetryProblemPage />
              </ProtectedRoute>
            }
          />

          {/* 로그인, 회원가입 페이지는 보호 안 함 (이전 병합 결과 유지) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
