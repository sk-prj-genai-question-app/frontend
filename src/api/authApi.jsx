// src/api/authApi.jsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 여기에 백엔드 주소 맞게 넣기

// 로그인
export const login = async (email, password) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/signin`,
    { email, password },
    { withCredentials: true } // ✅ 쿠키 포함 (refreshToken 저장용)
  );
  return response.data;
};

// 회원가입
export const register = async (email, password, passwordCheck) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
    email,
    password,
    passwordCheck,
  });
  return response.data;
};

// ✅ 비밀번호 검증 (현재 비밀번호 확인)
export const verifyPassword = async (password) => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await axios.post(
    `${API_BASE_URL}/auth/verify-password`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// ✅ 비밀번호 변경
export const changePassword = async (newPassword) => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await axios.post(
    `${API_BASE_URL}/auth/change-password`,
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
