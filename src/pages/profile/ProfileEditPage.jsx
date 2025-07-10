// src/pages/profile/ProfileEditPage.jsx
import React, { useState, useEffect } from 'react';
import styles from './ProfileEditPage.module.css';
import { verifyPassword, changePassword } from '../../api/authApi';  // ✅ 여기 핵심!

const ProfileEditPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const [step, setStep] = useState('verify');

  useEffect(() => {
    const savedEmail = localStorage.getItem('email') || '';
    setEmail(savedEmail);
    setName(savedEmail.split('@')[0] || '');
  }, []);

  // ✅ 현재 비밀번호 검증
  const verifyCurrentPassword = async () => {
    setCurrentPasswordError('');
    if (!currentPassword) {
      setCurrentPasswordError('현재 비밀번호를 입력하세요.');
      return false;
    }

    try {
      const result = await verifyPassword(currentPassword);
      if (result.success) {
        setStep('change');
        return true;
      } else {
        setCurrentPasswordError(result.message || '현재 비밀번호가 틀렸습니다.');
        return false;
      }
    } catch (err) {
      console.error('로그인 실패:', err);
      setCurrentPasswordError('서버 오류가 발생했습니다.');
      return false;
    }
  };

  // ✅ 새 비밀번호 변경
  const changePasswordHandler = async () => {
    setNewPasswordError('');
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,20}$/;

    if (!passwordRegex.test(newPassword)) {
      setNewPasswordError('비밀번호는 4~20자 영문+숫자 조합이어야 합니다.');
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setNewPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const result = await changePassword(newPassword);
      if (result.success) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        setNewPassword('');
        setNewPasswordConfirm('');
        setCurrentPassword('');
        setStep('verify');
      } else {
        setNewPasswordError(result.message || '비밀번호 변경에 실패했습니다.');
      }
    } catch (err) {
      console.error('로그인 실패:', err);
      setNewPasswordError('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>프로필 수정 (비밀번호 변경)</h2>
      <div className={styles.info}>
        <label>이메일</label>
        <input type="text" value={email} readOnly className={styles.readOnlyInput} />
      </div>
      <div className={styles.info}>
        <label>이름</label>
        <input type="text" value={name} readOnly className={styles.readOnlyInput} />
      </div>

      {step === 'verify' && (
        <>
          <div className={styles.info}>
            <label>현재 비밀번호</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={currentPasswordError ? styles.errorInput : ''}
            />
            {currentPasswordError && <p className={styles.errorMessage}>{currentPasswordError}</p>}
          </div>
          <button className={styles.button} onClick={verifyCurrentPassword}>
            확인
          </button>
        </>
      )}

      {step === 'change' && (
        <>
          <div className={styles.info}>
            <label>새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={newPasswordError ? styles.errorInput : ''}
              placeholder="4~20자 영문+숫자"
            />
          </div>
          <div className={styles.info}>
            <label>새 비밀번호 확인</label>
            <input
              type="password"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              className={newPasswordError ? styles.errorInput : ''}
            />
            {newPasswordError && <p className={styles.errorMessage}>{newPasswordError}</p>}
          </div>
          <button className={styles.button} onClick={changePasswordHandler}>
            변경
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileEditPage;
