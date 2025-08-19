import "@rainbow-me/rainbowkit/styles.css";
import { PropsWithChildren } from "react";
import { Providers } from "@/components/Providers";
import Link from "next/link";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Inter, system-ui, Arial", margin: 0 }}>
        <Providers>
          <header style={{ display: "flex", justifyContent: "space-between", padding: 16, borderBottom: "1px solid #eee" }}>
            <nav style={{ display: "flex", gap: 12 }}>
              <Link href="/">Home</Link>
              <Link href="/deposit">Deposit</Link>
              <Link href="/send">Send</Link>
              <Link href="/inbox">Inbox</Link>
              <Link href="/withdraw">Withdraw</Link>
              <Link href="/settings">Settings</Link>
            </nav>
          </header>
          <main style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}


