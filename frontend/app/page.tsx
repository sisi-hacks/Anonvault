"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function HomePage() {
  const { isConnected } = useAccount();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">eERC20 Privacy Donations</h1>
        <p className="page-subtitle">
          Send and receive tokens privately using encrypted ERC-20 on Avalanche Fuji testnet.
          This demo showcases private transfers with selective disclosure capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Connect Wallet</h2>
            <p className="card-subtitle">Connect your wallet to start using private transfers</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
            <ConnectButton />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Get Test Tokens</h2>
            <p className="card-subtitle">You'll need AVAX for gas and PUB tokens to deposit</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a 
              href="https://faucet.avax.network/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Get Fuji AVAX
            </a>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              The deployer wallet has 1,000,000 PUB tokens. Transfer some to your test wallets.
            </p>
          </div>
        </div>
      </div>

      {isConnected && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <div className="card-header">
            <h2 className="card-title">Quick Start Guide</h2>
            <p className="card-subtitle">Follow these steps to test the privacy features</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                For Senders:
              </h3>
              <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                <li>Go to <strong>Settings</strong> and set a viewing key</li>
                <li>Visit <strong>Deposit</strong> to convert PUB to private tokens</li>
                <li>Use <strong>Send</strong> to transfer privately to another wallet</li>
              </ol>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                For Recipients:
              </h3>
              <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                <li>Check <strong>Inbox</strong> to see received private transfers</li>
                <li>Use <strong>Withdraw</strong> to convert back to public PUB tokens</li>
                <li>Set viewing key in <strong>Settings</strong> for disclosure</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-header">
          <h2 className="card-title">About This Demo</h2>
          <p className="card-subtitle">Privacy-preserving token transfers with mock encryption</p>
        </div>
        <div style={{ color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '1rem' }}>
            This is a hackathon MVP demonstrating the concept of encrypted ERC-20 transfers. 
            While amounts are hidden from public events, this demo uses simplified privacy 
            mechanisms for educational purposes.
          </p>
          <p>
            <strong>Note:</strong> This is not production-ready cryptography. For real privacy, 
            see the <a href="https://github.com/alejandro99so/eerc-backend-converter" 
            target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
              eERC reference implementation
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}


