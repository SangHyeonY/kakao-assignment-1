"use client";

import { useTodoManager } from "@/app/hooks/useTodoManager";
import { formatDate } from "@/app/lib/utils";
import DateNavigator from "../components/DateNavigator";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import FilterTabs from "../components/FilterTabs";
import styles from "./page.module.css";

export default function TodoPage() {
  const {
    currentDate,
    changeDate,
    todos,
    counts,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    saveEdit,
    deleteTodo,
    selectedFilter,
    updateFilter,
    searchQuery,
    updateSearch,
  } = useTodoManager(new Date().toISOString().split("T")[0]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Todo List</h1>

        <DateNavigator
          selectedDate={currentDate}
          onPrev={() => changeDate(-1)}
          onNext={() => changeDate(1)}
          formatDate={formatDate}
        />

        <TodoInput
          onAdd={addTodo}
          searchQuery={searchQuery}
          onSearchChange={updateSearch}
        />

        <FilterTabs
          selectedFilter={selectedFilter}
          counts={counts}
          onFilterChange={updateFilter}
        />

        {error && <p className={styles.errorMessage}>{error}</p>}

        <TodoList
          todos={todos}
          isLoading={isLoading}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onSave={saveEdit}
        />
      </div>
    </div>
  );
}
