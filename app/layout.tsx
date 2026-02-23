import type { Metadata } from "next";
import { Raleway, Montserrat } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  weight: "700",
  subsets: ["latin", "cyrillic"],
  variable: "--font-raleway",
});

const montserrat = Montserrat({
  weight: ["500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Абонементы — Фитнес-зал",
  description: "Выбери подходящий для себя тариф",
};

/**
 * Корневой layout приложения
 */
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    lang="ru"
    className={`${raleway.variable} ${montserrat.variable}`}
    suppressHydrationWarning
  >
    <body
      className="antialiased min-h-screen bg-dark text-white font-montserrat"
      suppressHydrationWarning
    >
      {children}
    </body>
  </html>
);

export default RootLayout;
