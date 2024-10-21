// components/Navbar.tsx
'use client'; // 이 줄을 추가하세요

import React from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { authState } from '../authAtom'; // atom을 import합니다.

const Navbar: React.FC<{ toggleModal: () => void }> = ({ toggleModal }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, email: '' });
    localStorage.removeItem('authState'); // 로그아웃 시 로컬 스토리지에서 삭제
  };

  const handleItemClick = (item: string) => {
    if (auth.isLoggedIn) {
      if (item === '항목 5') {
        router.push('/About'); // 마이페이지로 이동
      } else {
        alert(`${item}에 로그인되었습니다.`);
      }
    } else {
      toggleModal(); // 로그인 팝업 열기
    }
  };

  // 메인 이름 클릭 시 Pages로 이동
  const handleLogoClick = () => {
    router.push('/pages'); // "Pages" 페이지로 이동
  };

  // "안녕하세요, {auth.email}!" 클릭 시 동작
  const handleGreetingClick = () => {
    if (auth.isLoggedIn) {
      router.push('/mypage'); // 마이페이지로 이동
    } else {
      toggleModal(); // 로그인 팝업 열기
    }
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle} onClick={handleLogoClick}>메인 이름</div>
      <ul style={ulStyle}>
        <li style={liStyle} onClick={() => handleItemClick('항목 1')}>항목 1</li>
        <li style={liStyle} onClick={() => handleItemClick('항목 2')}>항목 2</li>
        <li style={liStyle} onClick={() => handleItemClick('항목 3')}>항목 3</li>
        <li style={liStyle} onClick={() => handleItemClick('항목 4')}>항목 4</li>
        <li style={liStyle} onClick={() => handleItemClick('항목 5')}>항목 5</li>
        {auth.isLoggedIn ? (
          <>
            <li style={liStyle} onClick={handleGreetingClick}>안녕하세요, {auth.email}!</li>
            <li style={liStyle} onClick={handleLogout}>로그아웃</li>
          </>
        ) : (
          <li style={liStyle} onClick={toggleModal}>로그인</li>
        )}
      </ul>
    </nav>
  );
};




// 스타일 정의
const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  flexWrap: 'wrap',
};

const logoStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  cursor: 'pointer', // 클릭 가능하도록 커서 변경
};

const ulStyle: React.CSSProperties = {
  listStyleType: 'none',
  display: 'flex',
  margin: 0,
  padding: 0,
  flexWrap: 'wrap',
};

const liStyle: React.CSSProperties = {
  margin: '0 15px',
  cursor: 'pointer',
};

export default Navbar;
