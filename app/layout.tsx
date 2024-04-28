import "./globals.css";
import FormNav from "@/components/common/form-nav";
import FormFooter from "@/components/common/form-footer";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AI Form Generator",
  description:
    "The fastest way to Build, Itererate and Publish Forms using AI!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={figtree.className + " antialiased"}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col justify-between items-center">
          <FormNav />
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
          <FormFooter />
        </main>
      </body>
    </html>
  );
}
