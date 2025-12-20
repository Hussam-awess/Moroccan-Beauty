import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Moroccan Beauty | Organic Beauty Products from Morocco",
  description:
    "Premium organic beauty products from Morocco including argan oil, rose water, and black soap. Natural ingredients for radiant skin.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/placeholder-logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/placeholder-logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/placeholder-logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
