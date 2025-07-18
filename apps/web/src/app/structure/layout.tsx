import type { Metadata } from "next";
import {
  ClerkProvider,
  // SignInButton,
  // SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clerk Next.js Quickstart",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <html lang="en">
        <body>
          {/* <header>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
          </header> */}
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
