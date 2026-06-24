import React from "react";
import styles from "../todos/page.module.css";

interface DateNavigatorProps {
  selectedDate: string;
  onPrev: () => void;
  onNext: () => void;
  formatDate: (date: string) => string;
}

export default function DateNavigator({
  selectedDate,
  onPrev,
  onNext,
  formatDate,
}: DateNavigatorProps) {
  return (
    <div className={styles.dateNav}>
      <button onClick={onPrev} className={styles.dateButton}>
        ◀
      </button>
      <span className={styles.dateDisplay}>{formatDate(selectedDate)}</span>
      <button onClick={onNext} className={styles.dateButton}>
        ▶
      </button>
    </div>
  );
}
