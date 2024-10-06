'use client'; // 클라이언트 컴포넌트인 경우 추가

import { RecoilRoot } from 'recoil';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode; // children의 타입을 정의
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko"> {/* 언어 속성 추가 */}
      <body>
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
