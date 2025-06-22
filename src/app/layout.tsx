import type { Metadata } from "next";
import { Geist, Inter, Anton, Nunito } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "@/redux/ReduxWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Estate Agent",
  description: "A real estate agent website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxWrapper>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${anton.variable} ${nunito.variable} ${inter.className}   antialiased`}
        >
          {children}
        </body>
      </html>
    </ReduxWrapper>
  );
}
