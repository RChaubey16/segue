import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { getTransitions } from "@/lib/registry"
import type { Metadata } from "next"
import { Aleo, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const fontSans = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontSerif = Aleo({
  subsets: ["latin"],
  variable: "--font-serif",
})

const fontMono = JetBrains_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-mono",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://segue.dev"

export const metadata: Metadata = {
  title: {
    default: "Segue — Drop-in Page Transitions for Next.js",
    template: "%s — Segue",
  },
  description:
    "Beautiful, drop-in page transitions for Next.js powered by the View Transition API. Zero config, framework-native, and works with the App Router.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName: "Segue",
    title: "Segue — Drop-in Page Transitions for Next.js",
    description:
      "Beautiful, drop-in page transitions for Next.js powered by the View Transition API. Zero config, framework-native, and works with the App Router.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Segue — Drop-in Page Transitions for Next.js",
    description:
      "Beautiful, drop-in page transitions for Next.js powered by the View Transition API.",
  },
  keywords: [
    "Next.js",
    "page transitions",
    "View Transition API",
    "React",
    "animation",
    "App Router",
  ],
  authors: [{ name: "Segue" }],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const transitions = await getTransitions()

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Sidebar transitions={transitions} />
          <main className="min-h-dvh md:ml-60">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
