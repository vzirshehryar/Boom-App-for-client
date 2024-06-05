import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata = {
  title: "Content Boom",
  description: "Generate and Post Wordpress Blogs Easily",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-inter ${inter.variable} ${plusJakartaSans.variable} bg-background text-foreground`}
      >
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
