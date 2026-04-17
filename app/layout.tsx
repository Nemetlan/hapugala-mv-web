import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hapugala Vidyalaya Galle",
  description: "Official website of Hapugala Vidyalaya Galle, Sri Lanka. Established 1902. Let's Go Forward.",
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
