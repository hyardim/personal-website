import "./globals.css";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hakan Yardim – CS Student @ UCL",
  description: "Portfolio of Hakan Yardim — Computer Science student at University College London.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#050505] text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}

