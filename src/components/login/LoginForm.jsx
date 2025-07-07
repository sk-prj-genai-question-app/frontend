import React, { useState } from 'react';
import '../../pages/login/LoginRegisterPage.css';
import { login } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log('로그인 성공:', data);
      localStorage.setItem('accessToken', data.accessToken);  // ✅ accessToken 저장
      navigate('/');  // 홈으로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 실패! 아이디/비밀번호를 확인하세요.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        className="form-input"
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="form-input"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="form-button">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
