import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const lora = Lora({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baba Ka Dhaba",
  description: "This is a baba ka dhaba Restaurant website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <AuthProvider>
          <Notification />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
