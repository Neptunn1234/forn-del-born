import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Distrito Barber | Barberia a Barcelona",
  description:
    "Demo website for a modern local barbershop in Barcelona with clear services, prices and WhatsApp booking.",
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
