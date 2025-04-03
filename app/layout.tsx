import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D Solar System Visualization",
  description: "Interactive 3D visualization of our solar system using Three.js and React Three Fiber",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
} 