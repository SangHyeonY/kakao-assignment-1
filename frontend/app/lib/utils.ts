/* 날짜 유틸 : 문자열 -> (YYYY-MM-DD (요일)) */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString + "T00:00:00");

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayName = dayNames[date.getDay()];

  return `${year}-${month}-${day} (${dayName})`;
};
