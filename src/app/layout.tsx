import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.scss';
import 'primeflex/themes/primeone-light.css';
import 'primeflex/themes/primeone-dark.css';
import "primereact/resources/themes/arya-orange/theme.css";
import "./globals.css";
import { ToastProvider } from "@/context/toast";
import { Navbar } from "@/components/modules/Navbar/Navbar";
import { NavbarWrapper } from "@/components/modules/NavbarWrapper/NavbarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TuClasico.com",
  description: "TuClasico marketplace de remates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="page-body">
          <ToastProvider>
            <PrimeReactProvider>
              <NavbarWrapper/>
              {children}
            </PrimeReactProvider>
          </ToastProvider>
        </div>
      </body>
    </html>
  );
}
