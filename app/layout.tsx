import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "Coffee Shop",
  description: "Coffee Shop Ordering System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}