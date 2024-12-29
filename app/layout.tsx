import { GeistSans } from "geist/font/sans";
import "./globals.css";
import LayoutClient from "./LayoutClient";
import { ThemeProvider } from "next-themes";
import { fetchUser } from "@/services/supabase/server/Auth";
// import PushNotificationSetup from "@/components/PushNotificationSetup";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Carona Taquaruçu",
  description: "Um meio simples de conectar amigos que pedem carona",
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#000000',
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
      <LayoutClient email={data?.user?.email}>{children}</LayoutClient>
      </ThemeProvider>
      </body>
    </html>
  );
}
