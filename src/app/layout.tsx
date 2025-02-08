import type { Metadata } from "next";
import "./global/styles/globals.css";


export const metadata: Metadata = {
  title: "Class-Manager",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
