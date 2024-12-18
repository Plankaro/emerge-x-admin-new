import type { Metadata } from "next";

import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Emerge X",
  description: "Emerge-x Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Toaster richColors closeButton position="top-center" />
          {children}
        </StoreProvider>

      </body>
    </html>
  );
}
