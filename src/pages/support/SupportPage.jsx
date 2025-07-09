import React from 'react';
import './SupportPage.css';

const SupportPage = () => {
  return (
    <div className="support-page">
      <h2>📘 프로젝트 지원 정보</h2>

      <section className="project-info">
        <h3>📌 프로젝트 개요</h3>
        <p>
          이 프로젝트는 JLPT 수험생을 위한 AI 기반 문제 생성 및 오답 분석 플랫폼입니다.
          사용자는 실시간으로 문제를 생성하고 풀이 결과를 저장하며, 오답노트를 통해 복습할 수 있습니다.
          학습 성향에 맞춘 맞춤형 문제 생성과 통계 분석 기능도 지원합니다.
        </p>
      </section>

      <section className="developer-info">
        <h3>👨‍💻 개발자</h3>
        <ul>
          <li>오유식 - 프로젝트 매니저</li>
          <li>김인태 - 프론트엔드 개발</li>
          <li>나현승 - 프론트엔드 개발</li>
          <li>안희윤 - 프론트엔드 개발</li>
          <li>정혜영 - 백엔드 개발</li>
          <li>박효영 - 백엔드 개발</li>
        </ul>
      </section>

      <section className="github-info">
        <h3>🔗 GitHub 리포지토리</h3>
        <p>
          전체 소스코드는 아래 GitHub 링크에서 확인하실 수 있습니다. <br />
          👉{' '}
          <a
            href="https://github.com/sk-prj-genai-question-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/sk-prj-genai-question-app
          </a>
        </p>
      </section>
    </div>
  );
};

export default SupportPage;
