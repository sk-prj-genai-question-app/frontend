// components/chat/WrongNoteChatBox.jsx
import React, { useState } from "react";
import axios from "axios";
import styles from "./ChatBox.module.css";

const WrongNoteChatBox = ({ problemId }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("accessToken");
    const inputContent = input.trim();
    setInput(""); // 입력창 비우기

    const userMessage = { role: "user", content: inputContent };
    setIsLoading(true);

    try {
      const payload = {
        content: inputContent,
        // ❌ user_question_id는 아예 안 보냄 (새로 생성되게!)
      };

      const res = await axios.post(
        `http://localhost:8080/api/problems/${problemId}/chat`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = res?.data;
      const chatMessages = responseData?.data?.chatMessages ?? [];
      console.log("🪵 전체 chatMessages:", chatMessages);

      // AI 응답만 필터링해서 누적할 준비
      const aiMessages = chatMessages
        .filter((msg) => msg.is_user === false && msg.content?.trim())
        .map((msg) => ({
          role: "ai",
          content: msg.content,
        }));

      // 이전 대화 + 새 질문 + 새 응답 누적
      setChatHistory((prev) => [...prev, userMessage, ...aiMessages]);
    } catch (err) {
      console.error("❌ 질문 전송 실패:", err);
      setChatHistory((prev) => [
        ...prev,
        userMessage,
        { role: "ai", content: "⚠️ 오류가 발생했어요. 다시 시도해주세요!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatLog}>
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.role === "user" ? styles.userMessage : styles.aiMessage
            }
          >
            {msg.content.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}
        {isLoading && <div className={styles.loading}>💬 AI 응답 중...</div>}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="질문을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={isLoading}>
          전송
        </button>
      </div>
    </div>
  );
};

export default WrongNoteChatBox;
