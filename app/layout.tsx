import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PINTA POA",
  description:
    "Experiências criativas para artistas em ascensão em Porto Alegre",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="text/javascript"
          async
          defer
          src="//assets.pinterest.com/js/pinit.js"
        ></script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
