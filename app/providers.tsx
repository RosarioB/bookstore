import { ReactNode } from "react";
import { Provider } from "jotai";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider>
        {children}
        <Toaster position="bottom-left" richColors />
      </Provider>
    </ThemeProvider>
  );
}
