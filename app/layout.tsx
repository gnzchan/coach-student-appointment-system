import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/custom/header/header";
import { Footer } from "@/components/custom/footer/footer";
import ToasterProvider from "@/components/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coach-Student Appointment System ",
  description: "Generated by create next app - a Vanly project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-neutral-50`}
      >
        <ToasterProvider />
        <Header />
        <main className="flex-1 flex sm:justify-center">
          <div className="max-w-[1200px] min-w-[400px] w-full px-10 py-6">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
