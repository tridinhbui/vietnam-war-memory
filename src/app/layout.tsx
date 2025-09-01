import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vietnam National Day - Quốc khánh Việt Nam",
  description: "Celebrating Vietnam's history, culture and National Day on September 2nd",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}