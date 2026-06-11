import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eidentic Chat",
  description: "Memory-backed chat powered by Eidentic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
