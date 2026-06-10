import React, { useEffect, useMemo, useState } from "react";
import DateHeader from "./components/DateHeader";
import TodoInput from "./components/TodoInput";
import FilterTabs from "./components/FilterTabs";
import TodoList from "./components/TodoList";

function formatDate(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function createTodo(text, date) {
  const trimmed = text.trim();
  if (!trimmed) return null;

  return {
    id: Date.now(),
    text: trimmed,
    completed: false,
    date,
  };
}

const LOCAL_STORAGE_KEY = "todoDataList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("localStorage load error:", e);
      return [];
    }
  });

  const [selectedDate, setSelectedDate] = useState(() =>
    formatDate(new Date()),
  );

  const [filter, setFilter] = useState("all");

  // 로컬스토리지 저장
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error("localStorage save error:", e);
    }
  }, [todos]);

  // CRUD
  const addTodo = (text) => {
    const newTodo = createTodo(text, selectedDate);
    if (!newTodo) return false;

    setTodos((prev) => [newTodo, ...prev]);
    return true;
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const editTodo = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return false;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)),
    );
    return true;
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // 필터
  const filteredTodos = useMemo(() => {
    const byDate = todos.filter((t) => t.date === selectedDate);
    if (filter === "active") return byDate.filter((t) => !t.completed);
    if (filter === "completed") return byDate.filter((t) => t.completed);
    return byDate;
  }, [todos, selectedDate, filter]);

  const changeDate = (deltaDays) => {
    const cur = new Date(selectedDate);
    cur.setDate(cur.getDate() + deltaDays);
    setSelectedDate(formatDate(cur));
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-10 px-4 bg-[#f5f6fa]">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-center text-4xl font-bold text-[#672be0] mb-6 tracking-tight">
          Todo List
        </h1>

        <DateHeader
          selectedDate={selectedDate}
          onPrev={() => changeDate(-1)}
          onNext={() => changeDate(1)}
        />

        <TodoInput onAddTodo={addTodo} />

        <FilterTabs
          filter={filter}
          setFilter={setFilter}
          todos={todos}
          selectedDate={selectedDate}
        />

        <TodoList
          todos={filteredTodos}
          onToggleComplete={toggleComplete}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}
