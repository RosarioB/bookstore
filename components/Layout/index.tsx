import { ReactNode } from "react";
import Header, { HeaderProps } from "@/components/Layout/header";

export interface CommonLayoutProps {
  children?: ReactNode;
  headerProps?: HeaderProps;
}

export default function CommonLayout({
  headerProps,
  children,
}: CommonLayoutProps) {
  return (
    <div className="min-h-full">
      <Header {...headerProps} />

      <main>
        <div className="mx-auto max-w-7xl py-6 px-4">{children}</div>
      </main>
    </div>
  );
}
