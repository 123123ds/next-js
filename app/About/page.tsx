// app/About/page.tsx
'use client';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../authAtom';
import Navbar from '../Navbar/page'; // Navbar 컴포넌트 import
export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth] = useRecoilState(authState);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Navbar toggleModal={toggleModal} /> {/* Navbar 추가 */}
      <h1>About 페이지</h1>
      <p>{auth.isLoggedIn ? `안녕하세요, ${auth.email}님!` : '로그인해주세요.'}</p>

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>로그인</h2>
            <button type="button" onClick={toggleModal} style={closeButtonStyle}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

// 스타일 정의 (모달, 버튼 등은 기존과 동일)



// 스타일 정의
const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    flexWrap: 'wrap', // 반응형을 위해 추가
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
    flexWrap: 'wrap', // 반응형을 위해 추가
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
  