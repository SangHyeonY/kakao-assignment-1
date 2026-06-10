import React from "react";

function formatDisplay(dateStr) {
  const d = new Date(dateStr);
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return `${dateStr} (${weekday})`;
}

export default function DateHeader({ selectedDate, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between mb-4 gap-4">
      <button
        className="w-10 h-10 rounded-md bg-[#672be0] text-white flex items-center justify-center hover:opacity-90"
        onClick={onPrev}
        aria-label="이전일"
      >
        {"◀"}
      </button>

      <div className="text-[#672be0] text-lg font-bold tracking-tight">
        {formatDisplay(selectedDate)}
      </div>

      <button
        className="w-10 h-10 rounded-md bg-[#672be0] text-white flex items-center justify-center hover:opacity-90"
        onClick={onNext}
        aria-label="다음일"
      >
        {"▶"}
      </button>
    </div>
  );
}
