import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HR Portal - Document Management",
  description: "HR Core Document Management Application",
  icons: {
    icon: "/screen.png",
    shortcut: "/screen.png",
    apple: "/screen.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} antialiased light`}
    >
      <head>
        <link rel="icon" href="/screen.png" type="image/png" />
        <link rel="apple-touch-icon" href="/screen.png" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="text-on-surface min-h-screen bg-background flex flex-col">
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
