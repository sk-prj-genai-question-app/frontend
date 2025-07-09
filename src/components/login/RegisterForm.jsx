import React, { useState } from 'react';
import { register } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,20}$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!emailRegex.test(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(!passwordRegex.test(value));
    setPasswordConfirmError(value !== passwordConfirm);
  };

  const handlePasswordConfirmChange = (e) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    setPasswordConfirmError(password !== value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (emailError || passwordError || passwordConfirmError || !email || !password || !passwordConfirm) {
      return;
    }

    try {
      const data = await register(email, password, passwordConfirm);
      console.log('회원가입 성공:', data);
      alert('회원가입 성공! 로그인 해주세요.');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (error.response && error.response.status === 400) {
        setSubmitError('이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.');
      } else {
        setSubmitError('회원가입 실패! 다시 시도해주세요.');
      }
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const isFormValid = !emailError && !passwordError && !passwordConfirmError && email && password && passwordConfirm;

  return (
    <form onSubmit={handleRegister} className={styles.formContainer} noValidate>
      <h2 className={styles.formTitle}>회원가입</h2>

      <input
        className={`${styles.formInput} ${emailError ? styles.errorBorder : ''}`}
        type="email"
        placeholder="이메일 *"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <div
        className={`${styles.helperText} ${
          email
            ? emailError
              ? styles.errorText
              : styles.success
            : ''
        }`}
      >
        {email
          ? emailError
            ? '이메일 형식에 맞게 입력해주세요.'
            : '이메일 조건을 만족합니다.'
          : '이메일 형식으로 입력해 주세요.'}
      </div>

      <input
        className={`${styles.formInput} ${passwordError ? styles.errorBorder : ''}`}
        type="password"
        placeholder="비밀번호 *"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <div
        className={`${styles.helperText} ${
          password
            ? passwordError
              ? styles.errorText
              : styles.success
            : ''
        }`}
      >
        {password
          ? passwordError
            ? '비밀번호는 4~20자 영문+숫자 조합으로 입력 해주세요.'
            : '비밀번호 조건을 만족합니다.'
          : '비밀번호는 4~20자 영문+숫자 조합으로 입력 해주세요.'}
      </div>

      <input
        className={`${styles.formInput} ${passwordConfirmError ? styles.errorBorder : ''}`}
        type="password"
        placeholder="비밀번호 확인 *"
        value={passwordConfirm}
        onChange={handlePasswordConfirmChange}
        required
      />
      <div
        className={`${styles.helperText} ${
          passwordConfirm
            ? passwordConfirmError
              ? styles.errorText
              : styles.success
            : ''
        }`}
      >
        {passwordConfirm
          ? passwordConfirmError
            ? '비밀번호가 일치하지 않습니다.'
            : '비밀번호가 일치합니다!'
          : '비밀번호를 한번 더 입력해 주세요.'}
      </div>

      {submitError && <div className={styles.submitError}>{submitError}</div>}

      <button type="submit" className={styles.formButton} disabled={!isFormValid}>
        회원가입
      </button>

      <button type="button" className={styles.formButton} onClick={goToLogin}>
        로그인으로 돌아가기
      </button>
    </form>
  );
};

export default RegisterForm;
