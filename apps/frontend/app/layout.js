import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "EuroKits | Premium Football Jerseys",
  description: "Dashboard produk jersey klub bola Eropa premium. Temukan berbagai jenis kit, player issue, dan fan issue dari berbagai liga top Eropa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col" style={{ minHeight: '100vh' }}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
