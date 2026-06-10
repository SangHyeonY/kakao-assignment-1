import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="mb-3">
          <TodoItem
            todo={todo}
            onToggleComplete={() => onToggleComplete(todo.id)}
            onEdit={(newText) => onEdit(todo.id, newText)}
            onDelete={() => onDelete(todo.id)}
          />
        </li>
      ))}
    </ul>
  );
}
