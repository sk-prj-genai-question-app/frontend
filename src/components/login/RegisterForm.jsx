import React, { useState } from 'react';
import '../../pages/login/LoginRegisterPage.css';

const RegisterForm = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('회원가입 요청:', { nickname, email, password });
    // TODO: API 요청
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        className="form-input"
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
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
        회원가입
      </button>
    </form>
  );
};

export default RegisterForm;
