import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>JLPT AI</h2>
      <Link to="/">
        <button>홈</button>
      </Link>
      <Link to="/wrong-note">
        <button>오답노트</button>
      </Link>
      <Link to="/generate-problem">
        <button>문제 풀기</button>
      </Link>
      <Link to="/custom">
        <button>사용자 맞춤 문제</button>
      </Link>

      <div className="sidebar-bottom">
        <Link to="/support">
          <button>Support</button>
        </Link>
        <Link to="/settings">
          <button>Settings</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
