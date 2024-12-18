import type { Metadata } from "next";

import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Emerge X",
  description: "Emerge-x Website",
  icons: [
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
  ],
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
