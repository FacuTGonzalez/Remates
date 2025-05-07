import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.scss';
import 'primeflex/themes/primeone-light.css';
import 'primeflex/themes/primeone-dark.css';
import "primereact/resources/themes/arya-orange/theme.css";
import "./globals.css";

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
        <PrimeReactProvider>
        {children}
        </PrimeReactProvider>
        </div>

      </body>
    </html>
  );
}
