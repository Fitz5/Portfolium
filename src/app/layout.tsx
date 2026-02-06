import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolium | FPV Photography & Video",
  description:
    "Professional FPV drone photography and videography services. Cinematic aerial footage for your project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
