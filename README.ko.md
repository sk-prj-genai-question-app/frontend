[English](./README.md) | [한국어](./README.ko.md) | [日本語](./README.ja.md)

---

# 🌐 JLPT 문제 생성 학습 도우미 - 프론트엔드

[![React](https://img.shields.io/badge/React-19-blue.svg)](#-tech-stack--libraries)
[![Vite](https://img.shields.io/badge/Vite-7.0-purple.svg)](#-tech-stack--libraries)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-cyan.svg)](#-tech-stack--libraries)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

"생성형 AI를 통한 JLPT 문제 생성 학습 도우미"의 사용자 인터페이스(UI)를 담당하는 프론트엔드 프로젝트입니다. React와 Vite를 기반으로 구축되었으며, 사용자가 JLPT 문제를 풀고, AI와 상호작용하며, 학습 진행 상황을 시각적으로 확인할 수 있는 모든 화면을 제공합니다.

<!-- 
![Project Screenshot](path/to/screenshot.png) 
-->

## ✨ 주요 기능

- **🖥️ 반응형 UI**: 데스크탑, 태블릿, 모바일 등 다양한 디바이스에 최적화된 화면.
- **👤 사용자 인증**: 직관적인 회원가입 및 로그인 폼 제공.
- **📝 문제 풀이**: AI가 생성한 JLPT 문제를 풀고 정답을 제출하는 인터랙티브 인터페이스.
- **📊 학습 대시보드**: Recharts를 활용한 학습 진행률, 정답률 등 시각적 데이터 차트 제공.
- **🤖 AI 챗봇**: AI와 실시간으로 질문하고 답변을 받을 수 있는 채팅 UI.
- **⚙️ 라우팅**: React Router DOM을 사용한 부드러운 페이지 전환.

## 🛠️ 기술 스택 및 주요 라이브러리

| 구분 | 기술 / 라이브러리 | 설명 |
| :--- | :--- | :--- |
| **언어** | JavaScript (ES6+), TypeScript | |
| **프레임워크** | React | v19.1 |
| **빌드 도구** | Vite | v7.0 |
| **스타일링** | Tailwind CSS, PostCSS | |
| **상태 관리** | React Hooks (useState, useContext 등) | |
| **라우팅** | React Router DOM | v7.6 |
| **HTTP 통신** | Axios | v1.10 |
| **차트/시각화**| Recharts, React Circular Progressbar | |
| **아이콘** | React Icons | |
| **코드 린팅** | ESLint | |

## 📂 프로젝트 구조

```
src/
├── api/              # 백엔드 API 연동 (Axios 인스턴스)
├── assets/           # 이미지, 폰트 등 정적 에셋
├── components/       # 재사용 가능한 공통 UI 컴포넌트 (버튼, 모달 등)
├── pages/            # 각 페이지를 구성하는 메인 컴포넌트 (로그인, 대시보드 등)
├── App.jsx           # 애플리케이션 최상위 컴포넌트 및 라우팅 설정
└── main.jsx          # React 애플리케이션 진입점
```

## 🚀 시작하기

### 1. 사전 요구사항

- Node.js (v18.x 이상 권장)
- npm

### 2. 설치

프로젝트 루트 디렉토리에서 아래 명령어를 실행하여 의존성을 설치합니다.
```bash
npm install
```

### 3. 환경 설정

백엔드 API 서버의 주소를 설정해야 합니다. 프로젝트 루트에 `.env.development` 파일을 생성하고 아래와 같이 API 서버 주소를 입력하세요.

```
# .env.development
VITE_API_BASE_URL=http://localhost:8080 
```
> **참고**: 이 변수는 `src/api/axios.js` 와 같은 파일에서 `import.meta.env.VITE_API_BASE_URL` 형태로 사용됩니다.

### 4. 개발 서버 실행

아래 명령어를 실행하면 Vite 개발 서버가 시작됩니다.
```bash
npm run dev
```
서버가 시작되면 `http://localhost:5173` 주소로 접속할 수 있습니다.

## 📜 주요 NPM 스크립트

- `npm run dev`: 개발 모드로 Vite 서버를 실행합니다.
- `npm run build`: 프로덕션용으로 애플리케이션을 빌드하여 `dist` 폴더에 결과물을 생성합니다.
- `npm run lint`: ESLint를 사용하여 코드 스타일을 검사합니다.
- `npm run preview`: 프로덕션 빌드 결과물을 로컬에서 미리 확인합니다.

## 🐳 Docker로 프로덕션 환경 실행

이 프로젝트는 Nginx를 사용하여 정적 파일을 서빙하는 멀티-스테이지 Docker 빌드를 지원합니다.

1.  **Docker 이미지 빌드**
    ```bash
    docker build -t jlpt-frontend:latest .
    ```

2.  **Docker 컨테이너 실행**
    ```bash
    docker run -p 80:80 jlpt-frontend:latest
    ```
    이제 `http://localhost` 주소로 접속하여 프로덕션 빌드된 애플리케이션을 확인할 수 있습니다.

## 🤝 기여하기

기여는 언제나 환영합니다! 이슈를 생성하거나 Pull Request를 보내주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
