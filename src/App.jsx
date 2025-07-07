// App.jsx
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
import N1Page from "./pages/N1Page";
import N2Page from "./pages/N2Page";
import N3Page from "./pages/N3Page";
import CustomPage from "./pages/CustomPage";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SettingsPage";
import WrongNotePage from "./pages/wrongnote/WrongNotePage";
import MyPage from "./pages/home/MyPage";
import LoginRegisterPage from "./pages/login/LoginRegisterPage";

import "./index.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <TopBar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<MyPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/n1" element={<N1Page />} />
              <Route path="/n2" element={<N2Page />} />
              <Route path="/n3" element={<N3Page />} />
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
