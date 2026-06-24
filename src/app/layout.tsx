import type { Metadata } from "next";
import { Geist_Mono, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProjectsProvider } from "@/components/providers/projects-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { DataforseoPreferenceProvider } from "@/components/providers/dataforseo-preference-provider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Genially SEO",
    template: "%s | Genially SEO",
  },
  description:
    "Genially SEO Platform — keyword research, visibility, backlinks and site audits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("crawlit-theme");document.documentElement.classList.add(t==="dark"?"dark":"light");})();`,
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <DataforseoPreferenceProvider>
              <ProjectsProvider>{children}</ProjectsProvider>
            </DataforseoPreferenceProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
