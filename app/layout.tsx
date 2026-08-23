import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CuántoSubióPy",
  description: "Cuánto subieron los precios de la canasta básica en Paraguay",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="fondo-liquid font-cuerpo text-tinta">
        {children}
      </body>
    </html>
  );
}
