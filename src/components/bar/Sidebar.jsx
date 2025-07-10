import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

import { LuArrowBigLeftDash, LuArrowBigRightDash } from 'react-icons/lu';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      {/* 토글 버튼 (항상 보임) */}
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen ? <LuArrowBigLeftDash size={20} /> : <LuArrowBigRightDash size={20} />}
      </button>

      {/* 사이드바 내용 */}
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
        <button>챗봇</button>
      </Link>
      <div className={styles.sidebarBottom}>
        <Link to="/support">
          <button>Support</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
