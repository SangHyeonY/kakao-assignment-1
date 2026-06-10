import React, { useState } from "react";

function ActionButton({ className, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-white px-3.5 py-2 rounded-lg text-sm ${className} hover:opacity-90`}
    >
      {children}
    </button>
  );
}

export default function TodoItem({ todo, onToggleComplete, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [message, setMessage] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const startEdit = () => {
    setEditValue(todo.text);
    setMessage("");
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (!editValue.trim()) {
      setMessage("내용을 입력해 주세요.");
      return;
    }

    const ok = onEdit(editValue);
    if (ok) {
      setIsEditing(false);
      setMessage("");
    } else {
      setMessage("수정에 실패했습니다.");
    }
  };

  /* 수정 및 삭제 시: prompt 없이 인라인 형태로 구현 (confirm() 제거)*/
  const cancelEdit = () => {
    setIsEditing(false);
    setEditValue(todo.text);
    setMessage("");
  };

  const handleDeleteClick = () => {
    setConfirmingDelete(true);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setConfirmingDelete(false);
  };

  const handleDeleteCancel = () => {
    setConfirmingDelete(false);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border border-gray-300 rounded-lg ${
        todo.completed ? "opacity-80" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        {isEditing ? (
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
          />
        ) : (
          <span
            className={`text-sm ${
              todo.completed ? "line-through text-gray-500" : "text-black"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 ml-4">
        {isEditing ? (
          <>
            <ActionButton className="bg-[#3498db]" onClick={saveEdit}>
              저장
            </ActionButton>
            <ActionButton className="bg-gray-400" onClick={cancelEdit}>
              취소
            </ActionButton>
          </>
        ) : confirmingDelete ? (
          <>
            <span className="text-sm text-gray-600">삭제할까요?</span>
            <ActionButton
              className="bg-[#e74c3c]"
              onClick={handleDeleteConfirm}
            >
              확인
            </ActionButton>
            <ActionButton className="bg-gray-400" onClick={handleDeleteCancel}>
              취소
            </ActionButton>
          </>
        ) : (
          <>
            <ActionButton className="bg-[#672be0]" onClick={onToggleComplete}>
              {todo.completed ? "취소" : "완료"}
            </ActionButton>

            <ActionButton className="bg-[#3498db]" onClick={startEdit}>
              수정
            </ActionButton>

            <ActionButton className="bg-[#e74c3c]" onClick={handleDeleteClick}>
              삭제
            </ActionButton>
          </>
        )}
      </div>

      {message && (
        <div className="text-sm text-red-500 mt-2 w-full">{message}</div>
      )}
    </div>
  );
}
