import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>JLPT AI</h2>
      <Link to="/">
        <button>홈</button>
      </Link>
      <Link to="/review">
        <button>오답노트</button>
      </Link>
      <Link to="/n1">
        <button>N1</button>
      </Link>
      <Link to="/n2">
        <button>N2</button>
      </Link>
      <Link to="/n3">
        <button>N3</button>
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
