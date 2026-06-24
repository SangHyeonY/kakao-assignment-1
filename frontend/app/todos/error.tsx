"use client";
import { useEffect } from "react";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>문제가 발생했습니다</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: "10px 20px",
          background: "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
