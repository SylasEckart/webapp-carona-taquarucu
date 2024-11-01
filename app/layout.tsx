import { GeistSans } from "geist/font/sans";
import "./globals.css";
import LayoutClient from "./LayoutClient";
import { ThemeProvider } from "next-themes";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Carona Taquaruçu",
  description: "Um meio simples de conectar amigos que pedem carona",
};



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-br" className={GeistSans.className} suppressHydrationWarning>
    <body className="bg-background text-foreground">
    <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >      

      <LayoutClient>
      {children}
      </LayoutClient>
      </ThemeProvider>
      </body>
    </html>
  );
}
