// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // 여기에서 사용자 인증 로직을 구현하세요.
  // 예를 들어, DB에서 사용자 정보를 조회하고 비밀번호를 확인하는 과정입니다.

  if (email === 'test@example.com' && password === 'password') {
    return NextResponse.json({ message: '로그인 성공' });
  } else {
    return NextResponse.json({ message: '로그인 실패' }, { status: 401 });
  }
}
