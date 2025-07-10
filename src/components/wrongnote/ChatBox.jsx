// components/chat/WrongNoteChatBox.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./ChatBox.module.css";

const WrongNoteChatBox = ({ problemId }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("accessToken");
    const inputContent = input.trim();
    setInput("");

    const userMessage = { role: "user", content: inputContent };
    const loadingMessage = { role: "ai", content: "💬 AI 응답 중..." };

    // 일단 사용자 질문과 '응답 중...' 메시지를 넣음
    setChatHistory((prev) => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      const payload = { content: inputContent };
      const res = await axios.post(
        `/api/problems/${problemId}/chat`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const responseData = res?.data;
      const chatMessages = responseData?.data?.chatMessages ?? [];

      const aiMessages = chatMessages
        .filter((msg) => msg.is_user === false && msg.content?.trim())
        .map((msg) => ({
          role: "ai",
          content: msg.content,
        }));

      // '응답 중...'을 제거하고 실제 AI 메시지 추가
      setChatHistory((prev) => [
        ...prev.slice(0, prev.length - 1),
        ...aiMessages,
      ]);
    } catch (err) {
      console.error("❌ 질문 전송 실패:", err);
      setChatHistory((prev) => [
        ...prev.slice(0, prev.length - 1),
        { role: "ai", content: "⚠️ 오류가 발생했어요. 다시 시도해주세요!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 채팅 맨 아래로 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatLog}>
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.messageRow} ${
              msg.role === "user" ? styles.userMessageRow : styles.aiMessageRow
            }`}
          >
            {msg.role === "ai" && <div className={styles.profileIcon}>🤖</div>}
            <div
              className={`${styles.messageBubble} ${
                msg.role === "user" ? styles.userBubble : styles.aiBubble
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className={styles.profileIcon}>👤</div>
            )}
          </div>
        ))}
        
        <div ref={chatEndRef} />
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="질문을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={isLoading}>
          전송
        </button>
      </div>
    </div>
  );
};

export default WrongNoteChatBox;
