import React, { useState } from "react";

export default function TodoInput({ onAddTodo }) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    if (!value.trim()) {
      setMessage("할 일을 입력해 주세요.");
      return;
    }
    const ok = onAddTodo(value);
    if (ok) {
      setValue("");
      setMessage("");
    } else {
      setMessage("추가에 실패했습니다.");
    }
  };

  const onEnter = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="mb-4">
      <div className="flex gap-3">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          type="text"
          placeholder="할 일을 입력하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onEnter}
        />
        <button
          className="px-4 py-3 bg-violet-700 text-white rounded-md hover:opacity-90"
          onClick={handleAdd}
        >
          추가
        </button>
      </div>
      <div className="text-sm text-red-500 mt-2 min-h-[1rem]">{message}</div>
    </div>
  );
}
