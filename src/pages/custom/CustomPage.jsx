import React, { useState } from "react";
import axios from "axios";
import "./CustomPage.css"; // CSS 별도 관리

const CustomPage = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { type: "user", text: question };
    setChatHistory((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setSelectedAnswer(null);
    setShowAnswer(false);

    try {
      const response = await axios.post("/ai/chatbot", {
        userId: "demo_user",
        question,
      });

      const data = response.data;

      if (data.is_problem) {
        setChatHistory((prev) => [
          ...prev,
          {
            type: "ai",
            isProblem: true,
            problem: data,
          },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          {
            type: "ai",
            isProblem: false,
            answer: data.answer,
          },
        ]);
      }
    } catch (err) {
      console.error("질문 처리 오류: ", err);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          isProblem: false,
          answer: "⚠ 질문을 처리하는 중 오류가 발생했습니다.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  };

  const handleChoiceSelect = (number) => {
    setSelectedAnswer(number);
    setShowAnswer(true);
  };

  return (
    <div className="custom-page">
      <h2 className="title">🧠 AI JLPT 챗봇</h2>
      <div className="chat-box">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chat-bubble ${chat.type === "user" ? "user" : "ai"}`}
          >
            {chat.type === "user" ? (
              <p>{chat.text}</p>
            ) : chat.isProblem ? (
              <div className="problem-block">
                <div className="problem-title">
                  {chat.problem.problem_title_parent}
                </div>
                {chat.problem.problem_content && (
                  <div className="problem-content">
                    {chat.problem.problem_content}
                  </div>
                )}
                <ul className="choice-list">
                  {chat.problem.choices.map((choice) => (
                    <li key={choice.number}>
                      <button
                        className={`choice-button ${
                          showAnswer && selectedAnswer === choice.number
                            ? choice.number === chat.problem.answer_number
                              ? "correct"
                              : "incorrect"
                            : ""
                        }`}
                        onClick={() => handleChoiceSelect(choice.number)}
                        disabled={showAnswer}
                      >
                        {choice.number}. {choice.content}
                      </button>
                    </li>
                  ))}
                </ul>
                {showAnswer && (
                  <div className="answer-section">
                    <strong>
                      {selectedAnswer === chat.problem.answer_number
                        ? "✅ 정답입니다!"
                        : "❌ 오답입니다."}
                    </strong>
                    <p className="explanation">{chat.problem.explanation}</p>
                  </div>
                )}
              </div>
            ) : (
              <p>{chat.answer}</p>
            )}
          </div>
        ))}
        {isLoading && <div className="chat-bubble ai">⏳ AI 응답 중...</div>}
      </div>

      <form onSubmit={handleSubmit} className="question-form">
        <input
          type="text"
          placeholder="질문을 입력하세요..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          전송
        </button>
      </form>
    </div>
  );
};

export default CustomPage;
