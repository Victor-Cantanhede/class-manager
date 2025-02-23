import type { Metadata } from "next";
import { ModalProvider } from "./context/ModalContext";
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
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
