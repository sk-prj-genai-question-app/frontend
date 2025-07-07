import React from 'react';
import Dashboard from '../components/Dashboard';  // ✅ 대시보드 불러오기

const HomePage = () => {
  return (
    <div>
      <Dashboard />  {/* ✅ 대시보드 삽입 */}
    </div>
  );
};

export default HomePage;