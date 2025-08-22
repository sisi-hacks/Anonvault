import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Providers } from "@/components/Providers";
import Link from "next/link";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="header">
            <div className="container">
              <nav className="nav">
                <div>
                  <Link href="/" className="nav-link" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                    eERC20 Privacy
                  </Link>
                </div>
                <div className="nav-links">
                  <Link href="/" className="nav-link">Home</Link>
                  <Link href="/deposit" className="nav-link">Deposit</Link>
                  <Link href="/send" className="nav-link">Send</Link>
                  <Link href="/inbox" className="nav-link">Inbox</Link>
                  <Link href="/withdraw" className="nav-link">Withdraw</Link>
                  <Link href="/settings" className="nav-link">Settings</Link>
                </div>
              </nav>
            </div>
          </header>
          <main className="main">
            <div className="container">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}


