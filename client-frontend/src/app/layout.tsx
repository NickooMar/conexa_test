import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ticketly",
  description: "Ticketly is a ticketing platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
