"use client";

import { useState } from "react";
import styles from "../todos/page.module.css";

interface TodoInputProps {
  onAdd: (title: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function TodoInput({
  onAdd,
  searchQuery,
  onSearchChange,
}: TodoInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAdd(inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.inputContainer}>
      <form onSubmit={handleSubmit} className={styles.addForm}>
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          추가
        </button>
      </form>

      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
}
