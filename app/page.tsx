// app/page.tsx
'use client'; // 이 줄을 추가하세요

import React, { useState } from 'react';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setMessage(data.message);

    // 로그인 성공 여부에 따라 상태 업데이트
    if (response.ok) {
      setIsLoggedIn(true);
      toggleModal(); // 로그인 성공 후 모달 닫기
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      <nav style={navStyle}>
        <div style={logoStyle}>메인 이름</div>
        <ul style={ulStyle}>
          <li style={liStyle}>항목 1</li>
          <li style={liStyle}>항목 2</li>
          <li style={liStyle}>항목 3</li>
          <li style={liStyle}>항목 4</li>
          <li style={liStyle}>항목 5</li>
          <li style={liStyle} onClick={toggleModal}>로그인</li>
        </ul>
      </nav>
      <h1>{isLoggedIn ? `환영합니다, ${email}!` : '하이'}</h1> {/* 로그인 상태에 따라 메시지 변경 */}

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label>
                  이메일:
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle} 
                  />
                </label>
              </div>
              <div>
                <label>
                  비밀번호:
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle} 
                  />
                </label>
              </div>
              <button type="submit" style={buttonStyle}>로그인</button>
              <button type="button" onClick={toggleModal} style={closeButtonStyle}>닫기</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

// 스타일 정의 (위와 동일)

// 스타일 정의 (위와 동일)


// 스타일 정의
const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const logoStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const ulStyle: React.CSSProperties = {
  listStyleType: 'none',
  display: 'flex',
  margin: 0,
  padding: 0,
};

const liStyle: React.CSSProperties = {
  margin: '0 15px',
  cursor: 'pointer',
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const inputStyle: React.CSSProperties = {
  display: 'block',
  margin: '10px 0',
  padding: '8px',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '10px',
  padding: '10px 15px',
  backgroundColor: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const closeButtonStyle: React.CSSProperties = {
  marginTop: '10px',
  padding: '10px 15px',
  backgroundColor: '#ccc',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
