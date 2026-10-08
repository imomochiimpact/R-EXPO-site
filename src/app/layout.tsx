import type { Metadata } from "next";
import { Inter, Oswald, Zen_Kaku_Gothic_New } from "next/font/google";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
import RouteBar from "@/components/common/routeBar/RouteBar";
import { SITE_DESCRIPTION, SITE_URL } from "@/constants/site";
import "./globals.css";

// 日本語
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-kaku",
  display: "swap",
  preload: false,
});

// 英語
const inter = Inter({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 数字
const oswald = Oswald({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | R-EXPO 2027",
    default: "R-EXPO 2027",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "R-EXPO 2027",
    description: SITE_DESCRIPTION,
    images: [{
      url: "https://r-expo.site/2027/brand/ogp.png",
      width: 1200,
      height: 630,
      alt: "R-EXPO 2027",
    }],
  },
  twitter: {
    card: "summary_large_image",
    images: "https://r-expo.site/2027/brand/ogp.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${zenKaku.variable} ${inter.variable} ${oswald.variable}`}
    >
      <body>
        <Header />
        <RouteBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
