import React, { useState } from 'react';
import '../../pages/login/LoginRegisterPage.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('로그인 요청:', { email, password });
    // TODO: API 요청
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
