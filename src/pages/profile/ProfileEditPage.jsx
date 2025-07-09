// ProfileEditPage.jsx
import React, { useState, useEffect } from 'react';
import styles from './ProfileEditPage.module.css';

const ProfileEditPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  // 현재 비밀번호 입력 상태
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');

  // 새 비밀번호 입력 상태
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  // 단계 관리: 'verify' (현재 비밀번호 검증), 'change' (비밀번호 변경 폼)
  const [step, setStep] = useState('verify');

  useEffect(() => {
    // 로그인한 사용자 이메일, 이름 localStorage에서 불러오기 (또는 API 호출)
    const savedEmail = localStorage.getItem('email') || '';
    setEmail(savedEmail);
    setName(savedEmail.split('@')[0] || '');
  }, []);

  // 현재 비밀번호 검증 함수 (실제론 API 호출 필요)
  const verifyCurrentPassword = async () => {
    setCurrentPasswordError('');
    if (!currentPassword) {
      setCurrentPasswordError('현재 비밀번호를 입력하세요.');
      return false;
    }

    try {
      // 예: POST /api/verify-password { password: currentPassword }
      // 실제 API 호출로 변경해야 함
      // 여기선 임시로 "password123" 만 통과시키는 예시
      if (currentPassword === 'password123') {
        setStep('change');
        return true;
      } else {
        setCurrentPasswordError('현재 비밀번호가 틀렸습니다.');
        return false;
      }
    } catch (err) {
      setCurrentPasswordError('서버 오류가 발생했습니다.');
      return false;
    }
  };

  // 새 비밀번호 변경 함수 (실제론 API 호출 필요)
  const changePassword = async () => {
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
      // 예: POST /api/change-password { newPassword }
      // 실제 API 호출로 변경해야 함
      alert('비밀번호가 성공적으로 변경되었습니다.');
      setNewPassword('');
      setNewPasswordConfirm('');
      setCurrentPassword('');
      setStep('verify');
    } catch (err) {
      setNewPasswordError('비밀번호 변경에 실패했습니다.');
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
          <button className={styles.button} onClick={changePassword}>
            변경
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileEditPage;
