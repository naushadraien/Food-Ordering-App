import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <ReactQueryProvider>
            <Notification />
            <Navbar />
            {children}
            <Footer />
            <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
