import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import BackgroundMusic from "@/components/BackgroundMusic";

// Fuente elegante para títulos
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Fuente legible para el cuerpo de texto
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Cartas de Año Nuevo 2026",
  description: "Cartas digitales personalizadas para celebrar el Año Nuevo 2026",
  keywords: ["año nuevo", "cartas", "felicitación", "2026"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${lora.variable} antialiased font-serif`}
      >
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
