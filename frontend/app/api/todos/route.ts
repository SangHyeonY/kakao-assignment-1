import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/* 전체 Todo 조회 (GET, POST) */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const res = await fetch(`${FASTAPI_URL}/todos?${queryString}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("FastAPI GET Error:", errorText);
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET API Proxy Error:", error);
    return NextResponse.json(
      { error: "백엔드 서버 연결에 실패했습니다." },
      { status: 500 },
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(`${FASTAPI_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("FastAPI POST Error:", errorText);
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST API Proxy Error:", error);
    return NextResponse.json(
      { error: "백엔드 서버에 데이터를 보내는 중 실패했습니다." },
      { status: 500 },
    );
  }
}
