import { NextResponse } from "next/server";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/* 개별 Todo 수정 및 삭제 (PUT, DELETE) */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = await request.json();

  const res = await fetch(`${FASTAPI_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return NextResponse.json(result);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const res = await fetch(`${FASTAPI_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) return NextResponse.json({ error: "Failed" }, { status: 500 });
  return NextResponse.json({ success: true });
}
