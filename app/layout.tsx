import { GeistSans } from "geist/font/sans";
import "./globals.css";
import LayoutClient from "./LayoutClient";
import { ThemeProvider } from "next-themes";
import { fetchUser } from "@/services/supabase/server/Auth";
import { Viewport } from "next";

// import PushNotificationSetup from "@/components/PushNotificationSetup";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";


  export const viewport : Viewport = {
    themeColor: '#000000',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
    width: 'device-width',
    height: 'device-height',
  }

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Carona Taquaruçu",
  description: "Um meio simples de conectar amigos que pedem carona",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Carona'
  },
  applicationName: 'Carona Taquarucu',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192x192.png',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  }
};



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const {data} = await fetchUser()


  return (
    <html lang="pt-br" className={GeistSans.className} suppressHydrationWarning>
    <body className="bg-background text-foreground">
    {/* <PushNotificationSetup /> */}
    <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
      <LayoutClient user={data?.user || undefined}>{children}</LayoutClient>
      </ThemeProvider>
      </body>
    </html>
  );
}
