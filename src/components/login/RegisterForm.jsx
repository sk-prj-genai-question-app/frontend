import React, { useState } from 'react';
import { register } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');
    setSubmitError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,20}$/;
    let valid = true;

    // 이메일 검증
    if (!emailRegex.test(email)) {
      setEmailError('이메일 형식에 맞게 작성해주세요.');
      valid = false;
    }

    // 비밀번호 형식 검증
    if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 4~20자 영문+숫자 조합이어야 합니다.');
      valid = false;
    } else if (password !== passwordConfirm) {
      // 비밀번호 일치 여부 검증
      setPasswordError('비밀번호가 일치하지 않습니다.');
      valid = false;
    }

    if (!valid) return;

    try {
      const data = await register(email, password, passwordConfirm);
      console.log('회원가입 성공:', data);
      alert('회원가입 성공! 로그인 해주세요.');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (error.response) {
        if (error.response.status === 400) {
          setSubmitError('이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.');
        } else {
          setSubmitError(error.response.data.message || '서버 오류가 발생했습니다.');
        }
      } else if (error.request) {
        setSubmitError('서버와 연결할 수 없습니다. 인터넷 상태를 확인해주세요.');
      } else {
        setSubmitError('회원가입 실패! 다시 시도해주세요.');
      }
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <form onSubmit={handleRegister} className={styles.formContainer} noValidate>
      <h2 className={styles.formTitle}>회원가입</h2>

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

      <input
        className={`${styles.formInput} ${passwordError ? styles.error : ''}`}
        type="password"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
      />
      {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}

      {submitError && <div className={styles.submitError}>{submitError}</div>}

      <button type="submit" className={styles.formButton}>
        회원가입
      </button>

      <button type="button" className={styles.formButton} onClick={goToLogin}>
        로그인으로 돌아가기
      </button>
    </form>
  );
};

export default RegisterForm;
