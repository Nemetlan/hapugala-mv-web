import type { Metadata } from "next";
import "./globals.css";

import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair_display = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '700'], style: ['normal', 'italic'] });
const dancing_script = Dancing_Script({ subsets: ['latin'], variable: '--font-handwriting', weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "Hapugala Vidyalaya Galle",
  description: "Official website of Hapugala Vidyalaya Galle, Sri Lanka. Established 1902. Let's Go Forward.",
  icons: "/favicon.ico"
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair_display.variable} ${dancing_script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
