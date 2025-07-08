import React from "react";
import "./ExamInfoCard.css";

const ExamInfoCard = () => {
  return (
    <div className="exam-card">
      <h3>📢 JLPT 시험 정보</h3>
      <p>📅 2025년 12월 1일 (일)</p>
      <p>📝 접수: 8월 25일 ~ 9월 30일</p>
      <p>
        📊 합격률
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;N1: 34.5% &nbsp;&nbsp; N2: 37.1%
        &nbsp;&nbsp; N3: 41.8% <br />
      </p>
      <p>
        📰{" "}
        <a
          href="https://search.naver.com/search.naver?where=news&query=JLPT 일본어능력시험"
          target="_blank"
          rel="noopener noreferrer"
          className="news-link"
        >
          JLPT 관련 뉴스 보기
        </a>
      </p>
    </div>
  );
};

export default ExamInfoCard;
