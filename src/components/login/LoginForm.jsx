import React, { useState } from 'react';
import { login } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setSubmitError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
      valid = false;
    }

    if (password.length < 4) {
      setPasswordError('비밀번호는 최소 4자 이상이어야 합니다.');
      valid = false;
    }

    if (!valid) return;

    try {
      const data = await login(email, password);
      console.log('로그인 성공:', data);
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('email', email);
      window.location.href = '/';
    } catch (error) {
      console.error('로그인 실패:', error);
      setSubmitError('로그인 실패! 아이디/비밀번호를 확인하세요.');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <form onSubmit={handleLogin} className={styles.loginForm} noValidate>
      <h2 className={styles.formTitle}>로그인</h2>

      <input
        className={`${styles.formInput} ${emailError ? styles.error : ''}`}
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {emailError && <div className={styles.errorMessage}>{emailError}</div>}

      <input
        className={`${styles.formInput} ${passwordError ? styles.error : ''}`}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}

      {submitError && <div className={styles.submitError}>{submitError}</div>}

      <button type="submit" className={styles.formButton}>
        로그인
      </button>
      <button
        type="button"
        className={styles.formButton}
        onClick={goToRegister}
      >
        회원가입
      </button>
    </form>
  );
};

export default LoginForm;
