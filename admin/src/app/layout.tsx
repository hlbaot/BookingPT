import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import "aos/dist/aos.css";
import "@/styles/globals.css";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Booking Photo Admin",
  applicationName: "Booking Photo Admin",
  icons: "/logo.jpg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dancing.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
