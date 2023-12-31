import GlobalState from "@/context";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <NavBar />
          <main className='flex min-h-screen flex-col mt-[80px]'>

          {children}
          </main>
        </GlobalState>
      </body>
    </html>
  );
}
