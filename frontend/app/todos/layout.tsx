import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Todo",
  description: "Todo 관리 페이지",
};
export default function TodoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
