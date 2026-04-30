import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import PageLoader from "@/components/layout/PageLoader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // choose what you need
  variable: '--font-space-grotesk', // optional (for Tailwind)
});

export const metadata: Metadata = {
  metadataBase: new URL("https://camanolo.com"),
  title: {
    default: "Camanolo Homestay",
    template: "%s | Camanolo Homestay",
  },
  description:
    "Experience authentic Siargao living at Camanolo Homestay in General Luna, Philippines.",
  keywords: [
    "Camanolo Homestay",
    "Siargao homestay",
    "General Luna accommodation",
    "Siargao Philippines",
    "Philippines homestay",
  ],
  openGraph: {
    title: "Camanolo Homestay",
    description:
      "Experience authentic Siargao living at Camanolo Homestay in General Luna, Philippines.",
    url: "https://camanolo.com",
    siteName: "Camanolo Homestay",
    images: [
      {
        url: "/image-4.png",
        width: 1200,
        height: 630,
        alt: "Camanolo Homestay in Siargao, Philippines",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Camanolo Homestay",
    description:
      "Experience authentic Siargao living at Camanolo Homestay in General Luna, Philippines.",
    images: ["/image-4.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
