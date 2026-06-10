import React from "react";

export default function FilterTabs({ filter, setFilter, todos, selectedDate }) {
  const byDate = todos.filter((t) => t.date === selectedDate);
  /* 상태별 Todo 개수 계산 */
  const allCount = byDate.length;
  const activeCount = byDate.filter((t) => !t.completed).length;
  const completedCount = byDate.filter((t) => t.completed).length;

  const btnBase = "flex-1 py-2 rounded-md border text-sm font-medium";
  const activeStyle = "bg-[#672be0] text-white border-[#672be0]";
  const inactiveStyle = "bg-white text-[#672be0] border-[#672be0]";

  return (
    <div className="flex gap-3 mb-4">
      <button
        className={`${btnBase} ${filter === "all" ? activeStyle : inactiveStyle}`}
        onClick={() => setFilter("all")}
      >
        전체 ({allCount})
      </button>

      <button
        className={`${btnBase} ${filter === "active" ? activeStyle : inactiveStyle}`}
        onClick={() => setFilter("active")}
      >
        진행 중 ({activeCount})
      </button>

      <button
        className={`${btnBase} ${filter === "completed" ? activeStyle : inactiveStyle}`}
        onClick={() => setFilter("completed")}
      >
        완료 ({completedCount})
      </button>
    </div>
  );
}
