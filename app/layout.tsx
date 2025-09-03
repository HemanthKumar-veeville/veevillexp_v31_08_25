import type { Metadata } from "next";
import "../styles/globals.css";
import CustomCursor from "./components/CustomCursor";

export const metadata: Metadata = {
  title: "Veeville - Where grown-ups remember how to play",
  description:
    "A set of hand-crafted immersive experiences for your team and leadership. Through play, touch, wonder, and experimentation, we help teams unlearn biases, collaborate organically, and see challenges with fresh eyes.",
  generator: "Veeville Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https:; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'self';"
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        <CustomCursor />
        <main>{children}</main>
      </body>
    </html>
  );
}
