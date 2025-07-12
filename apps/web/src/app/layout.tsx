import type { Metadata } from "next";
import { Inter, Montserrat, Lato } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/common/BottomNav";
// import { ClerkProvider, useAuth } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Narby App",
  description: "Social health, rewards, and group motivation app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, montserrat.className, lato.className, "bg-gradient-to-br from-[#A259FF] to-[#BFFF3C] min-h-screen")}> 
        {/* <ClerkProvider> */}
        <ConvexClientProvider>
          <Header />
          <main className="pt-20 pb-20 min-h-screen">{children}</main>
          <BottomNav />
        </ConvexClientProvider>
        {/* </ClerkProvider> */}
      </body>
    </html>
  );
}
