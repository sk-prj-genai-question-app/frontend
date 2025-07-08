import React, { useState } from 'react';
import { login } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';  // ✅ 모듈 CSS import

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log('로그인 성공:', data);
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 실패! 아이디/비밀번호를 확인하세요.');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <h2 className={styles.formTitle}>로그인</h2>
      <input
        className={styles.formInput}
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className={styles.formInput}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className={styles.formButton}>
        로그인
      </button>
      <button
        type="button"
        className={`${styles.formButton} ${styles.registerButton}`}
        onClick={goToRegister}
      >
        회원가입
      </button>
    </form>
  );
};

export default LoginForm;
