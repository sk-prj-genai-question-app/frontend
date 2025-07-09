import React, { useState, useEffect } from 'react';
import { login } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;

  useEffect(() => {
    if (submitError) {
      const timer = setTimeout(() => {
        setSubmitError('');
      }, 5000);  // 10초 뒤 자동 제거

      return () => clearTimeout(timer);
    }
  }, [submitError]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!emailRegex.test(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(!passwordRegex.test(value));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (emailError || passwordError || !email || !password) {
      return;
    }

    try {
      const data = await login(email, password);
      console.log('로그인 성공:', data);
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('email', email);
      window.location.href = '/';
    } catch (error) {
    console.error('로그인 실패:', error);
      if (error.response) {
        setSubmitError('로그인 실패! 아이디/비밀번호를 확인하세요.');
      } else {
        setSubmitError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const isFormValid = !emailError && !passwordError && email && password;

  return (
    <form onSubmit={handleLogin} className={styles.loginForm} noValidate>
      <h2 className={styles.logo}>JLPT AI</h2>

      <input
        className={`${styles.formInput} ${email ? (emailError ? styles.errorBorder : styles.successBorder) : ''}`}
        type="email"
        placeholder="이메일"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <div
        className={`${styles.helperText} ${
          email ? (emailError ? styles.errorText : styles.successText) : ''
        }`}
      >
        {email
          ? emailError
            ? '올바른 이메일 형식을 입력해주세요.'
            : '이메일 형식이 올바릅니다.'
          : '이메일을 입력해 주세요.'}
      </div>

      <input
        className={`${styles.formInput} ${password ? (passwordError ? styles.errorBorder : styles.successBorder) : ''}`}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <div
        className={`${styles.helperText} ${
          password ? (passwordError ? styles.errorText : styles.successText) : ''
        }`}
      >
        {password
          ? passwordError
            ? '비밀번호는 4자리 이상 영어+숫자 조합으로 입력해주세요.'
            : '비밀번호 조건을 만족합니다.'
          : '비밀번호를 입력해 주세요.'}
      </div>

      {submitError && <div className={styles.submitError}>{submitError}</div>}

      <button type="submit" className={styles.formButton} disabled={!isFormValid}>
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
