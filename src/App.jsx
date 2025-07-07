import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WrongNotePage from "./pages/WrongNotePage";
import MyPage from "./pages/MyPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<WrongNotePage />} /> */}
        <Route path="/" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
