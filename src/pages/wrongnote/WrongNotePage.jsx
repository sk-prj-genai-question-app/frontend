import React, { useState } from "react";
import Select from "react-select";
import "./WrongNotePage.css";

const mockData = [
  {
    id: 1,
    correct: false,
    question: "다음 중 '고장나다'의 일본어 표현으로 옳은 것은?",
    options: ["壊す", "壊れる", "消す", "直す"],
    level: "N2",
    subject: "언어지식(문자・어휘・문법)・독해",
  },
  {
    id: 2,
    correct: true,
    question: "다음 문장에서 올바른 조사를 고르세요: 彼___映画を見ました。",
    options: ["が", "を", "に", "と"],
    level: "N1",
    subject: "언어지식(문자・어휘・문법)・독해",
  },
  {
    id: 3,
    correct: true,
    question: "다음 중 '불안정한'과 가장 가까운 뜻을 가진 단어는?",
    options: ["安定", "不安定", "安全", "危険"],
    level: "N1",
    subject: "언어지식(문자・어휘・문법)・독해",
  },
  {
    id: 4,
    correct: true,
    question: "질문: 男の人は何をしたいと言っていますか？",
    options: ["공원에 가고 싶다", "커피를 마시고 싶다", "친구를 만나고 싶다", "영화를 보고 싶다"],
    level: "N3",
    subject: "청언어지식(문법)・독해",
  },
  {
    id: 5,
    correct: false,
    question: "질문: 女の人はいつ来ると言っていますか？",
    options: ["3시", "4시", "5시", "6시"],
    level: "N3",
    subject: "언어지식(문자・어휘)",
  },
];

const allSubjects = [
  "언어지식(문자・어휘・문법)・독해",
  "언어지식(문자・어휘)",
  "언어지식(문법)・독해",
];

const subjectOptionsByLevel = {
  전체: allSubjects,
  N1: ["언어지식(문자・어휘・문법)・독해"],
  N2: ["언어지식(문자・어휘・문법)・독해"],
  N3: ["언어지식(문자・어휘)", "언어지식(문법)・독해"],
};

const WrongNotePage = () => {
  const [levelFilter, setLevelFilter] = useState("전체");
  const [subjectFilter, setSubjectFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState("전체");

  const handleLevelChange = (e) => {
    const selected = e.target.value;
    setLevelFilter(selected);
    setSubjectFilter([]); // 과목 초기화
  };

  const handleSubjectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((opt) => opt.value);
    setSubjectFilter(selectedValues);
  };

  const filteredData = mockData.filter((item) => {
    const levelMatch = levelFilter === "전체" || item.level === levelFilter;
    const subjectMatch =
      subjectFilter.length === 0 || subjectFilter.includes(item.subject);
    const statusMatch =
      statusFilter === "전체" ||
      (statusFilter === "정답" && item.correct) ||
      (statusFilter === "오답" && !item.correct);
    return levelMatch && subjectMatch && statusMatch;
  });

  const subjectOptions = subjectOptionsByLevel[levelFilter]?.map((subj) => ({
    label: subj,
    value: subj,
  }));

  return (
    <>
      <div className="wrongnote-wrapper">
        {/* 📌 필터 영역 */}
        <div className="filter-bar">
          <select value={levelFilter} onChange={handleLevelChange}>
            <option disabled>레벨</option>
            <option value="전체">전체</option>
            <option value="N1">N1</option>
            <option value="N2">N2</option>
            <option value="N3">N3</option>
          </select>

          <Select
            className="subject-select-container"
            classNamePrefix="react-select"
            isMulti
            placeholder="과목"
            options={subjectOptions}
            value={subjectOptions.filter((opt) =>
              subjectFilter.includes(opt.value)
            )}
            onChange={handleSubjectChange}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option disabled>상태</option>
            <option value="전체">전체</option>
            <option value="오답">오답</option>
            <option value="정답">정답</option>
          </select>
        </div>

        {/* 📌 문제 카드 */}
        <div className="question-scroll">
          <div className="question-grid">
            {filteredData.map((item) => (
              <div key={item.id} className="question-card">
                <div className="card-top-bar">
                  <div className="meta-info">
                    {item.level} | {item.subject}
                  </div>
                </div>

                <div className="question-header">
                  <img
                    src={item.correct ? "/correct.png" : "/wrong.png"}
                    alt="status"
                    className="status-icon"
                  />
                  <span className="question-text">{item.question}</span>
                </div>
                <ul className="option-list">
                  {item.options.map((opt, idx) => (
                    <li key={idx}>{`${idx + 1}. ${opt}`}</li>
                  ))}
                </ul>

                <div className="button-group">
                  <button>다시 풀기</button>
                  <button>해설 보기</button>
                  <button className="delete">삭제</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📌 전체 다시 풀기 버튼 */}
        <div className="fixed-bottom-button">
          <button>전체 다시 풀기</button>
        </div>
      </div>
    </>
  );
};

export default WrongNotePage;
