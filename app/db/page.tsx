'use client'; // 클라이언트 컴포넌트로 설정

import { useEffect, useState } from 'react';

const DbPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [inputData, setInputData] = useState(''); // 사용자가 입력한 데이터
  const [responseMessage, setResponseMessage] = useState(''); // API 응답 메시지

  const fetchData = async () => {
    try {
      const response = await fetch('/api/test'); // API 경로를 /api/test로 변경
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData }), // 사용자 입력 데이터 전송
      });

      const result = await response.json();
      setResponseMessage(result.message); // 응답 메시지 설정
      setInputData(''); // 입력 필드 초기화
      fetchData(); // 데이터를 다시 가져와서 업데이트
    } catch (error) {
      setResponseMessage('Error: ' + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Database Page</h1>
      {error && <p>Error: {error}</p>}
      {responseMessage && <p>{responseMessage}</p>} {/* 응답 메시지 표시 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)} // 입력 필드 값 변경
          placeholder="Enter data"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DbPage;
