import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gordon Liang",
  description: "Personal site and project index.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
