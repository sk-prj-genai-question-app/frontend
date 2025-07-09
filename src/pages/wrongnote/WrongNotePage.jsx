import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./WrongNotePage.css";

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

const WrongNotePage = ({ userId }) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [levelFilter, setLevelFilter] = useState("전체");
  const [subjectFilter, setSubjectFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState("전체");
  const [openExplanations, setOpenExplanations] = useState({});

  // 📡 API 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.log("⛔ accessToken 없음");
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1])); // 중간 부분 디코딩
        const userId = payload.id;

        const answerRes = await axios.get(
          `http://localhost:8080/api/answer-record/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const rawData = answerRes?.data?.data;
        // console.log("✅ 응답 전체:", res);
        // console.log("✅ 응답 데이터:", res.data);

        if (!rawData) {
          console.log("📭 응답이 비어 있어요! (rawData가 undefined)");
          return;
        }

        if (!Array.isArray(rawData)) {
          console.log("❌ 응답 형식이 배열이 아닙니다.");
          return;
        }

        const detailedData = await Promise.all(
          rawData.map(async (item) => {
            try {
              const probRes = await axios.get(
                `http://localhost:8080/api/problems/${item.questionId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const problem = probRes.data.data;
              // console.log("지문: ", problem.problemContent);

              return {
                id: item.recordId,
                correct: item.isCorrect,
                level: item.level,
                subject: item.problemType,
                question: `${item.problemTitleParent}`,
                sub_question: `${item.problemTitleChild}`,
                problm_content: item.problemContent,
                userAnswer: item.userAnswer,
                answerNumber: item.answerNumber,
                explanation: item.explanation,
                options: Array.isArray(problem.choices)
                  ? problem.choices.map((c) => ({
                      number: c.number,
                      content: c.content,
                    }))
                  : [],
              };
            } catch (err) {
              console.error("❌ 문제 상세 조회 실패:", err);
              return null;
            }
          })
        );

        const filtered = detailedData.filter((d) => d !== null);
        setAllData(filtered);
      } catch (err) {
        console.error("❌ 오답노트 데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (recordId) => {
    const token = localStorage.getItem("accessToken");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    try {
      await axios.delete(
        `http://localhost:8080/api/answer-record/user/${userId}/${recordId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 삭제 후 상태 업데이트
      setAllData((prev) => prev.filter((item) => item.id !== recordId));
      window.confirm("🗑️ 삭제 성공!");
    } catch (err) {
      console.error("❌ 삭제 실패:", err);
      alert("삭제 중 문제가 발생했어요!");
    }
  };

  const confirmAndDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      handleDelete(id);
    }
  };

  // 🔍 필터링
  useEffect(() => {
    const result = allData.filter((item) => {
      const levelMatch = levelFilter === "전체" || item.level === levelFilter;
      const subjectMatch =
        subjectFilter.length === 0 || subjectFilter.includes(item.subject);
      const statusMatch =
        statusFilter === "전체" ||
        (statusFilter === "정답" && item.correct) ||
        (statusFilter === "오답" && !item.correct);
      return levelMatch && subjectMatch && statusMatch;
    });
    setFilteredData(result);
  }, [allData, levelFilter, subjectFilter, statusFilter]);

  const handleLevelChange = (e) => {
    setLevelFilter(e.target.value);
    setSubjectFilter([]);
  };

  const handleSubjectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((opt) => opt.value);
    setSubjectFilter(selectedValues);
  };

  const subjectOptions = subjectOptionsByLevel[levelFilter]?.map((subj) => ({
    label: subj,
    value: subj,
  }));

  const getSubjectLabel = (subjectCode) => {
    switch (subjectCode) {
      case "V":
        return "어휘";
      case "G":
        return "문법";
      case "R":
        return "독해";
      default:
        return subjectCode;
    }
  };

  const toggleExplanation = (id) => {
    setOpenExplanations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
                    {item.level} | {getSubjectLabel(item.subject)}
                  </div>
                </div>
                <div className="question-header">
                  <img
                    src={item.correct ? "/correct.png" : "/wrong.png"}
                    alt="status"
                    className="status-icon"
                  />
                  <div className="question-text-wrapper">
                    <div className="question-text">{item.question}</div>
                    <div className="sub-question-text">{item.sub_question}</div>
                  </div>
                </div>
                {item.problm_content && (
                  <div className="passage-box">{item.problm_content}</div>
                )}{" "}
                <ul className="option-list">
                  {item.options.map((opt) => (
                    <li key={opt.number}>{`${opt.number}. ${opt.content}`}</li>
                  ))}
                </ul>
                {openExplanations[item.id] && (
                  <div className="explanation-box">
                    <div className="explanation-title">해설</div>
                    <div
                      className="explanation-content"
                      dangerouslySetInnerHTML={{
                        __html: item.explanation.replace(/\n/g, "<br />"),
                      }}
                    />
                  </div>
                )}
                <div className="button-group">
                  <button>다시 풀기</button>
                  <button onClick={() => toggleExplanation(item.id)}>
                    {openExplanations[item.id] ? "해설 닫기" : "해설 보기"}
                  </button>
                  <button
                    className="delete"
                    onClick={() => confirmAndDelete(item.id)}
                  >
                    삭제
                  </button>
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
