import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"; 
import Navigation from "@/components/Navigation";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Brain Waves",
  description: "Learn smarter with Brain Waves’ AI-powered courses for students. Start your journey to success today!.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className} bg-dark antialiased pattern`}
      >
         <header><Navigation/></header>
        {children}
        <Toaster position="bottom-right"/>
      </body>
    </html>
  );
}
