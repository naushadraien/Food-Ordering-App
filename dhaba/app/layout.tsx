import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const lora = Lora({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FeastFlix",
  description: "This is a FeastFlix Restaurant website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ReactQueryProvider>
              <Notification />
              <Navbar />
              {children}
              <Footer />
              <ToastContainer
                position="bottom-right"
                theme="dark"
                autoClose={3000}
              />
            </ReactQueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
