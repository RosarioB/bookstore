import { ReactNode } from "react";
import Header from "@/components/Layout/header";

export interface CommonLayoutProps {
  children: ReactNode;
  hideMenu: boolean;
}

export default function CommonLayout({
  hideMenu,
  children,
}: CommonLayoutProps) {
  return (
    <div className="min-h-full">
      <Header hideMenu={hideMenu} />
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4">{children}</div>
      </main>
    </div>
  );
}
