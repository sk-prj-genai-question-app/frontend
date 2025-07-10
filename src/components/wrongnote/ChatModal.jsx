// components/chat/WrongNoteChatModal.jsx
import React from "react";
import styles from "./ChatModal.module.css";
import WrongNoteChatBox from "./ChatBox";

const WrongNoteChatModal = ({ problemId, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>💬 질문하기</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✖
          </button>
        </div>
        <WrongNoteChatBox problemId={problemId} />
      </div>
    </div>
  );
};

export default WrongNoteChatModal;
