// WrongNotePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import styles from "./WrongNotePage.module.css";
import WrongNoteChatBox from "../../components/wrongnote/ChatBox";
import WrongNoteChatModal from "../../components/wrongnote/ChatModal";

const allSubjects = ["어휘", "문법", "독해"];

const subjectOptionsByLevel = {
  전체: allSubjects,
  N1: ["어휘", "문법", "독해"],
  N2: ["어휘", "문법", "독해"],
  N3: ["어휘", "문법", "독해"],
};

const WrongNotePage = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [levelFilter, setLevelFilter] = useState("전체");
  const [subjectFilter, setSubjectFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState("전체");
  const [openExplanations, setOpenExplanations] = useState({});
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.warn("⛔ accessToken 없음");
          return;
        }

        const res = await axios.get(
          "http://localhost:8080/api/answer-record/my-records?isCorrect=false",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const rawData = res?.data?.data;
        if (!Array.isArray(rawData)) return;

        // ✅ 문제별로 정답/오답 각각 가장 최신 기록만 남기기
        const grouped = {};
        rawData.forEach((item) => {
          const qid = item.questionId;
          if (!grouped[qid]) grouped[qid] = [];
          grouped[qid].push(item);
        });

        const uniqueRecords = [];
        for (const records of Object.values(grouped)) {
          const latestCorrect = [...records]
            .filter((r) => r.correct === true)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          const latestIncorrect = [...records]
            .filter((r) => r.correct === false)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

          if (latestCorrect) uniqueRecords.push(latestCorrect);
          if (latestIncorrect) uniqueRecords.push(latestIncorrect);
        }

        // ✅ 문제 상세 정보 붙이기
        const detailedData = await Promise.all(
          uniqueRecords.map(async (item) => {
            try {
              const probRes = await axios.get(
                `http://localhost:8080/api/problems/${item.questionId}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              const problem = probRes.data.data;
              return {
                id: item.recordId,
                questionId: item.questionId,
                correct: item.correct,
                level: item.level,
                subject: item.problemType,
                question: item.problemTitleParent,
                sub_question: item.problemTitleChild,
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
            } catch {
              return null;
            }
          })
        );

        const filtered = detailedData.filter(Boolean);
        setAllData(filtered);
      } catch (err) {
        console.error("❌ 오답노트 데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (recordId) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(
        `http://localhost:8080/api/answer-record/${recordId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAllData((prev) => prev.filter((item) => item.id !== recordId));
      // TODO: window.alert 대신 커스텀 모달 사용
      window.alert("🗑️ 삭제 성공!");
    } catch (err) {
      console.error("❌ 삭제 실패:", err);
      // TODO: window.alert 대신 커스텀 모달 사용
      window.alert("삭제 중 문제가 발생했어요!");
    }
  };

  const confirmAndDelete = (id) => {
    // TODO: window.confirm 대신 커스텀 모달 사용
    if (window.confirm("정말 삭제하시겠습니까?")) handleDelete(id);
  };

  useEffect(() => {
    const result = allData.filter((item) => {
      const levelMatch = levelFilter === "전체" || item.level === levelFilter;
      const subjectMatch =
        subjectFilter.length === 0 ||
        subjectFilter.includes(getSubjectLabel(item.subject));

      const statusMatch =
        statusFilter === "전체" ||
        (statusFilter === "정답" && item.correct === true) ||
        (statusFilter === "오답" && item.correct === false);
      return levelMatch && subjectMatch && statusMatch;
    });

    setFilteredData(result);
  }, [allData, levelFilter, subjectFilter, statusFilter]);

  const handleLevelChange = (e) => {
    setLevelFilter(e.target.value);
    setSubjectFilter([]);
  };

  const handleSubjectChange = (selectedOptions) => {
    setSubjectFilter(selectedOptions.map((opt) => opt.value));
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
    setOpenExplanations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles.wrongnoteWrapper}>
      <div className={styles.filterBar}>
        <select value={levelFilter} onChange={handleLevelChange}>
          <option disabled>레벨</option>
          <option value="전체">전체</option>
          <option value="N1">N1</option>
          <option value="N2">N2</option>
          <option value="N3">N3</option>
        </select>
        <Select
          className={styles.subjectSelectContainer}
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

      <div className={styles.questionScroll}>
        <div className={styles.questionGrid}>
          {filteredData.map((item) => (
            <div key={item.id} className={styles.questionCard}>
              <div className={styles.cardTopBar}>
                <div className={styles.metaInfo}>
                  {item.level} | {getSubjectLabel(item.subject)}
                </div>
              </div>
              <div className={styles.questionHeader}>
                <img
                  src={item.correct ? "/correct.png" : "/wrong.png"}
                  alt="status"
                  className={styles.statusIcon}
                />
                <div className={styles.questionTextWrapper}>
                  <div className={styles.questionText}>{item.question}</div>
                  <div className={styles.subQuestionText}>
                    {item.sub_question}
                  </div>
                </div>
              </div>
              {item.problm_content && (
                <div className={styles.passageBox}>{item.problm_content}</div>
              )}
              <ul className={styles.optionList}>
                {item.options.map((opt) => (
                  <li key={opt.number}>{`${opt.number}. ${opt.content}`}</li>
                ))}
              </ul>
              {openExplanations[item.id] && (
                <div className={styles.explanationBox}>
                  <div className={styles.explanationTitle}>해설</div>
                  <div
                    className={styles.explanationContent}
                    dangerouslySetInnerHTML={{
                      __html: item.explanation.replace(/\n/g, "<br />"),
                    }}
                  />
                </div>
              )}
              {/* ✅ 충돌 해결 부분: 다시 풀기 기능 추가 및 CSS 모듈 적용 */}
              <div className={styles.buttonGroup}>
                {" "}
                {/* dev/1.3.1의 CSS 모듈 적용 */}
                <button
                  onClick={() => navigate(`/retry-problem/${item.questionId}`)} // feat/50-wrongnote-retake의 다시 풀기 기능 적용
                >
                  다시 풀기
                </button>
                <button onClick={() => toggleExplanation(item.id)}>
                  {openExplanations[item.id] ? "해설 닫기" : "해설 보기"}
                </button>
                <button
                  className={styles.delete} // dev/1.3.1의 CSS 모듈 적용
                  onClick={() => confirmAndDelete(item.id)}
                >
                  삭제
                </button>
                <button onClick={() => setSelectedProblemId(item.questionId)}>
                  질문하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProblemId && (
        <WrongNoteChatModal
          problemId={selectedProblemId}
          onClose={() => setSelectedProblemId(null)}
        />
      )}
      <div className={styles.fixedBottomButton}>
        <button onClick={() => navigate("/retry-all", { state: { problems: filteredData } })}>
          전체 다시 풀기
        </button>
      </div>
    </div>
  );
};

export default WrongNotePage;
