import React, { useState } from 'react';
import '../../pages/login/LoginRegisterPage.css';
import { register } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 간단 체크 (백엔드에도 체크 로직 있으면 생략 가능)
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const data = await register(nickname, email, password, passwordCheck);
      console.log('회원가입 성공:', data);
      alert('회원가입 성공! 로그인 해주세요.');
      navigate('/login');  // 로그인 페이지로 이동
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 실패! 다시 시도하세요.');
    }
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
      <input
        className="form-input"
        type="password"
        placeholder="비밀번호 확인"
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
        required
      />
      <button type="submit" className="form-button">
        회원가입
      </button>
    </form>
  );
};

export default RegisterForm;
