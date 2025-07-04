import React, { useState } from 'react';
import './LoginRegisterPage.css';
import LoginForm from '../../components/login/LoginForm';
import RegisterForm from '../../components/login/RegisterForm';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 shadow-xl rounded-xl bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? '로그인' : '회원가입'}
        </h2>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <p className="text-sm text-center mt-4">
          {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          <button
            className="ml-2 text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? '회원가입' : '로그인'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
