import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToasterContext } from "@/context/HotToaster";
const inter = Inter({ subsets: ["latin"] });
import { cookies } from "next/headers";
import { auth } from "@/auth";

import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Flight App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = cookies().get("accessToken");

  const session = await auth();

  return (
    <html lang="en">
      <body className="w-full mx-auto">
        <SessionProvider session={session}>
          <ToasterContext />
          <Navbar user={user!} session={session!} />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
