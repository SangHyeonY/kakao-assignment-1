import React from "react";
import TodoItem from "./TodoItem";
import styles from "../todos/page.module.css";
import { Todo } from "@/app/actions";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onSave: (todo: Todo, newTitle: string) => void;
}

export default function TodoList({
  todos,
  isLoading,
  onToggle,
  onDelete,
  onSave,
}: TodoListProps) {
  return (
    <div className={styles.todoList}>
      {isLoading ? (
        <p className={styles.loading}>로딩중...</p>
      ) : todos.length === 0 ? (
        <p className={styles.empty}>할 일이 없습니다</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onSave={onSave}
          />
        ))
      )}
    </div>
  );
}
