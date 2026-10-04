import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forn del Born | Pa artesà a Barcelona",
  description:
    "Pa artesà, brioixeria acabada de fer i bon cafè al cor del Born des de 1928.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body className="antialiased">{children}</body>
    </html>
  );
}
