import React from "react";
import styles from "../todos/page.module.css";

interface FilterTabsProps {
  selectedFilter: string;
  counts: { total: number; active: number; completed: number };
  onFilterChange: (filter: string) => void;
}

export default function FilterTabs({
  selectedFilter,
  counts,
  onFilterChange,
}: FilterTabsProps) {
  const filters = [
    { id: "all", label: "전체", count: counts.total },
    { id: "active", label: "진행 중", count: counts.active },
    { id: "completed", label: "완료", count: counts.completed },
  ] as const;

  return (
    <div className={styles.filterTabs}>
      {filters.map((f) => (
        <button
          key={f.id}
          className={`${styles.tab} ${selectedFilter === f.id ? styles.active : ""}`}
          onClick={() => onFilterChange(f.id)}
        >
          {f.label} ({f.count})
        </button>
      ))}
    </div>
  );
}
