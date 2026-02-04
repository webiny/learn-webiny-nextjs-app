import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn Webiny Next.js App",
  description: "A Next.js application integrated with Webiny Headless CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
