import type { Metadata } from "next";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import { DataProvider } from "./context/db/DataContext";
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
        <AuthProvider>
          <ModalProvider>
            <DataProvider>
              {children}
            </DataProvider>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
