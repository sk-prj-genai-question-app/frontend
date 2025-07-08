import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/bar/Sidebar";
import TopBar from "./components/bar/TopBar";

import ReviewPage from "./pages/ReviewPage";
import GenerateProblemPage from "./pages/problem/GenerateProblemPage";
import SolveProblemPage from "./pages/problem/SolveProblemPage";
import CustomPage from "./pages/CustomPage";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SettingsPage";
import WrongNotePage from "./pages/wrongnote/WrongNotePage";
import MyPage from "./pages/home/MyPage";
import LoginRegisterPage from "./pages/login/LoginRegisterPage";

import "./index.css";

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

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
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<MyPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/generate-problem" element={<GenerateProblemPage />} />
          <Route path="/solve-problem" element={<SolveProblemPage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/wrong-note" element={<WrongNotePage />} />
          <Route path="/login" element={<LoginRegisterPage />} />
          <Route path="/register" element={<LoginRegisterPage />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
