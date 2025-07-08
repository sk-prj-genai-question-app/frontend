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
import CustomPage from './pages/CustomPage';
import SupportPage from './pages/SupportPage';
import SettingsPage from './pages/SettingsPage';
import WrongNotePage from './pages/wrongnote/WrongNotePage';
import MyPage from './pages/home/MyPage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/login/RegisterPage';
import ProtectedRoute from './components/common/ProtectedRoute';

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
      {/* refactor/22-cleanup-ui-impprove의 LayoutWrapper를 사용하여 페이지 레이아웃을 관리 */}
      <LayoutWrapper>
        <Routes>
          {/* dev/1.1.0의 ProtectedRoute로 감싸진 라우트들 */}
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

          {/* 로그인, 회원가입 페이지는 보호 안 함 (dev/1.1.0 기준) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;