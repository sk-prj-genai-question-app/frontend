import React, { useState } from 'react';
import axios from 'axios';

const CustomPage = () => {
  const [question, setQuestion] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponseData(null);

    try {
      const response = await axios.post('http://localhost:8000/chatbot', {
        userId: 'demo_user',
        question: question,
      });

      setResponseData(response.data);
    } catch (err) {
      console.error('질문 처리 오류:', err);
      setError('질문 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI에게 질문하기</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          cols={60}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="AI에게 질문을 입력하세요"
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? '질문 처리 중...' : '질문하기'}
        </button>
      </form>

      {/* 오류 출력 */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 응답 출력 */}
      {responseData && (
        <div style={{ marginTop: '20px' }}>
          {responseData.is_problem ? (
            <>
              <h3>📘 문제 생성 결과</h3>
              <p><strong>레벨:</strong> {responseData.level}</p>
              <p><strong>유형:</strong> {responseData.problem_type}</p>
              <p><strong>문제 제목:</strong> {responseData.problem_title_parent}</p>
              <p><strong>소제목:</strong> {responseData.problem_title_child}</p>
              <p><strong>본문:</strong> {responseData.problem_content}</p>
              <ol>
                {responseData.choices.map((choice) => (
                  <li key={choice.number}>{choice.content}</li>
                ))}
              </ol>
              <p><strong>정답 번호:</strong> {responseData.answer_number}</p>
              <p><strong>해설:</strong> {responseData.explanation}</p>
            </>
          ) : (
            <>
              <h3>💬 일반 질문 응답</h3>
              <p>{responseData.answer}</p>
              {responseData.warning && (
                <p style={{ color: 'orange' }}>⚠ {responseData.warning}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomPage;
