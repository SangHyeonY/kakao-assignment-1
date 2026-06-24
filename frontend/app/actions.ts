"use server";

import { revalidatePath } from "next/cache";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  date: string;
}

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function fetchTodos(
  filter?: string,
  search?: string,
): Promise<Todo[]> {
  const url = new URL(`${FASTAPI_URL}/todos`);
  if (filter) url.searchParams.append("filter", filter);
  if (search) url.searchParams.append("search", search);

  const res = await fetch(url.toString(), { cache: "no-store" }); //GET
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function refreshTodos() {
  revalidatePath("/todos");
}
