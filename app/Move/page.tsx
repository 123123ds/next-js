'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../Navbar/page'; // Navbar 컴포넌트 import

const BookPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // useRouter 훅 사용
  const bookingId = searchParams.get('bookingId'); // 쿼리에서 예매 번호 추출
  const [selectedSeats, setSelectedSeats] = useState([]); // 선택된 좌석 배열
  const [seatsStatus, setSeatsStatus] = useState(Array(80).fill(false)); // 80개의 좌석 상태
  const [adultCount, setAdultCount] = useState(0); // 성인 수
  const [studentCount, setStudentCount] = useState(0); // 학생 수

  const rows = 'ABCDEFGHIJ';
  const seats = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleSeatClick = (row, seat) => {
    const seatIndex = (row.charCodeAt(0) - 'A'.charCodeAt(0)) * 10 + (seat - 1);
    const newSeatsStatus = [...seatsStatus];
    newSeatsStatus[seatIndex] = !newSeatsStatus[seatIndex]; // 클릭 시 선택 상태 반전
    setSeatsStatus(newSeatsStatus);

    if (newSeatsStatus[seatIndex]) {
      // 좌석이 선택되었을 경우
      setSelectedSeats([...selectedSeats, `열: ${row}, 좌석: ${seat}`]);
    } else {
      // 좌석이 선택 해제되었을 경우
      setSelectedSeats(selectedSeats.filter(seatInfo => seatInfo !== `열: ${row}, 좌석: ${seat}`));
    }
  };

  const toggleModal = () => {
    // 로그인 팝업 여는 함수 (구현 필요)
  };

  // 가격 계산
  const calculateTotalPrice = () => {
    const adultPrice = 15000; // 성인 가격
    const studentPrice = 12000; // 학생 가격
    return (adultCount * adultPrice) + (studentCount * studentPrice);
  };

  // 인원 수 조정 함수
  const adjustCount = (type, action) => {
    if (type === 'adult') {
      if (action === 'increase' && adultCount + studentCount < selectedSeats.length) {
        setAdultCount(prev => prev + 1);
      } else if (action === 'decrease') {
        setAdultCount(prev => Math.max(prev - 1, 0));
      }
    } else if (type === 'student') {
      if (action === 'increase' && adultCount + studentCount < selectedSeats.length) {
        setStudentCount(prev => prev + 1);
      } else if (action === 'decrease') {
        setStudentCount(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const totalCount = adultCount + studentCount;
  const isAdjustmentComplete = totalCount === selectedSeats.length && totalCount > 0; // 인원 수가 0보다 클 때만 완료로 간주

  const handleNextButtonClick = () => {
    // Bill 페이지로 이동
    router.push('/Bill'); // 'bill' 경로로 이동
  };

  return (
    <div>
      <Navbar toggleModal={toggleModal} /> {/* Navbar 추가 */}
      <h1>예매 페이지</h1>
      {bookingId ? (
        <p>선택한 예매 번호: {bookingId}</p>
      ) : (
        <p>로딩 중...</p>
      )}

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '20px', 
        padding: '20px', 
        backgroundColor: 'lightgray', 
        width: '80%', 
        marginLeft: 'auto', 
        marginRight: 'auto' 
      }}>
        <div style={{ textAlign: 'center', marginRight: '10px' }}>
          {seats.map(seat => (
            <div key={seat} style={{ margin: '5px 0', fontSize: '12px' }}>{seat}</div> // 폰트 크기 조정
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '5px' }}>
          {rows.split('').map((row) => 
            seats.map((seat) => {
              const seatIndex = (row.charCodeAt(0) - 'A'.charCodeAt(0)) * 10 + (seat - 1);
              const isSelected = seatsStatus[seatIndex];

              return (
                <button 
                  key={`${row}${seat}`} 
                  onClick={() => handleSeatClick(row, seat)} 
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: isSelected ? 'lightgreen' : 'white', // 선택된 좌석 색상 변경
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px' // 버튼 텍스트 크기 조정
                  }}
                >
                  {row}{seat}
                </button>
              );
            })
          )}
        </div>
        <div style={{ textAlign: 'center', marginLeft: '10px' }}>
          {rows.split('').map(row => (
            <div key={row} style={{ margin: '5px 0', fontSize: '12px' }}>{row}</div> // 폰트 크기 조정
          ))}
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>선택한 좌석 (총 {selectedSeats.length} 개)</h3> {/* 선택한 좌석 수 표시 */}
          {selectedSeats.map((seatInfo, index) => (
            <p key={index}>{seatInfo}</p>
          ))}
        </div>
      )}

      {/* 인원 수 조정 및 가격 표시 */}
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>인원 수 조정</h3>
        <div>
          <span>성인: {adultCount}</span>
          <button onClick={() => adjustCount('adult', 'increase')} disabled={adultCount + studentCount >= selectedSeats.length}>+</button>
          <button onClick={() => adjustCount('adult', 'decrease')}>-</button>
        </div>
        <div>
          <span>학생: {studentCount}</span>
          <button onClick={() => adjustCount('student', 'increase')} disabled={adultCount + studentCount >= selectedSeats.length}>+</button>
          <button onClick={() => adjustCount('student', 'decrease')}>-</button>
        </div>
        <h3>총 가격: {calculateTotalPrice()} 원</h3>
      </div>

      {/* 다음으로 버튼 */}
      {isAdjustmentComplete && (
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={handleNextButtonClick} 
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            다음으로
          </button>
        </div>
      )}
    </div>
  );
};

export default BookPage;
