import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/generalcomps/navbar/Navbar";
import Footer from "@/components/generalcomps/Footer";
import SignInModal from "@/components/modals/SignInModal";
import SearchModal from "@/components/modals/SearchModal";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NorthStories",
  description: "A collection of stories from north",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <QueryProvider>
          <Navbar />
        {children}
        <Footer />
        <SignInModal />
        <SearchModal />
        <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
