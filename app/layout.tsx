import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Hakan Yardim – Software Developer",
  description: "Personal developer portfolio of Hakan Yardim.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

