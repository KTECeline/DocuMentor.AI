import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { MouseGradientProvider } from "@/components/mouse-gradient-provider"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "DocuMentor.AI",
  description: "Auto-generate, summarize, and maintain documentation synced with GitHub/GitLab repos",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <MouseGradientProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </MouseGradientProvider>
        <Analytics />
      </body>
    </html>
  )
}
