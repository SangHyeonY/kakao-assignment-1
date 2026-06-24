import React, { useState } from "react";
import styles from "../todos/page.module.css";
import { Todo } from "@/app/actions";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onSave: (todo: Todo, newTitle: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onSave,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = () => {
    onSave(todo, editValue);
    setIsEditing(false);
  };

  return (
    <div className={styles.todoItem}>
      {isEditing ? (
        <div className={styles.editForm}>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={styles.editInput}
            autoFocus
          />
          <button
            onClick={handleSave}
            className={`${styles.button} ${styles.saveButton}`}
          >
            저장
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            취소
          </button>
        </div>
      ) : (
        <>
          <span
            className={`${styles.todoText} ${todo.completed ? styles.completed : ""}`}
          >
            {todo.title}
          </span>
          <div className={styles.buttonGroup}>
            {isDeleting ? (
              <>
                <button
                  onClick={() => onDelete(todo.id)}
                  className={`${styles.button} ${styles.confirmButton}`}
                >
                  확인
                </button>
                <button
                  onClick={() => setIsDeleting(false)}
                  className={`${styles.button} ${styles.cancelButton}`}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onToggle(todo)}
                  className={`${styles.button} ${styles.completeButton}`}
                >
                  {todo.completed ? "취소" : "완료"}
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className={`${styles.button} ${styles.editButton}`}
                >
                  수정
                </button>
                <button
                  onClick={() => setIsDeleting(true)}
                  className={`${styles.button} ${styles.deleteButton}`}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
