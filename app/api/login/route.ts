import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // GET 요청 처리
  return NextResponse.json({ message: 'GET 요청 성공' });
}

export async function POST(request: Request) {
  // POST 요청 처리
  return NextResponse.json({ message: 'POST 요청 성공' });
}

// 잘못된 메서드 처리
export async function OPTIONS(request: Request) {
  return NextResponse.json({ message: 'OPTIONS 요청 성공' }, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, OPTIONS',
    },
  });
}

// 모든 메서드에 대한 기본 처리
export async function handler(request: Request) {
  return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
}
