import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { MobileNav } from "@/components/MobileNav";
import { SplashScreen } from "@/components/SplashScreen";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LensView | Discovery & Professional Creative Suite",
  description:
    "High-performance photography community and portfolio platform for professional creators.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Start in dark mode — ThemeProvider will adjust on client after reading localStorage
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${jakarta.className} antialiased min-h-screen`}>
        <ThemeProvider>
          <AuthProvider>
            <SplashScreen />
            <div className="pb-16 md:pb-0">
              {children}
            </div>
            <MobileNav />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
