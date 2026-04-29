import { Metadata } from "next";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

// import { Inter } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import ReactQueryProvider from "@/api/provider";
import AuthAxiosBootstrap from "@/components/auth-axios-bootstrap";
import ParentLayout from "@/components/layouts/parent-layout";
import StateProvider from "@/redux/state-provider";
import Loading from "./loading";

// const inter = Inter({ subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: `NawaQare Doctor Panel`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/svg/logo2.svg" />
      </head>
      <body className={`${plusJakarta.className} max-w-[2000px] mx-auto`}>
        <StateProvider>
          <AuthAxiosBootstrap />
          <Suspense fallback={<Loading />}>
            <ReactQueryProvider>
              <ParentLayout>{children}</ParentLayout>
            </ReactQueryProvider>
          </Suspense>
        </StateProvider>

        <ToastContainer position="top-right" closeButton />
      </body>
    </html>
  );
}
