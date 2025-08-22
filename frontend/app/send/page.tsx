"use client";
import { useState } from "react";
import { useTransfer, usePrivateBalance } from "@/lib/eerc";
import { useAccount } from "wagmi";

export default function SendPage() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { transfer } = useTransfer();
  const { address } = useAccount();
  const { formatted, refetch } = usePrivateBalance(address as `0x${string}`);

  const handleTransfer = async () => {
    if (!to || !amount || parseFloat(amount) <= 0) return;
    
    setIsLoading(true);
    try {
      await transfer(to as `0x${string}`, amount);
      setAmount("");
      setTo("");
      refetch();
    } catch (error) {
      console.error("Transfer failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidAddress = to.startsWith("0x") && to.length === 42;
  const hasBalance = parseFloat(formatted) >= parseFloat(amount || "0");

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Send Private Transfer</h1>
        <p className="page-subtitle">
          Send tokens privately - amounts are hidden from public blockchain events
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Private Transfer</h2>
            <p className="card-subtitle">Send ePUB tokens to another wallet anonymously</p>
          </div>
          
          <div className="form-group">
            <label className="form-label">Recipient Address</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="0x..."
              className="form-input"
            />
            {to && !isValidAddress && (
              <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Please enter a valid Ethereum address
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Amount to Send</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1.0"
              className="form-input"
              step="0.1"
              min="0"
            />
            {amount && !hasBalance && (
              <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Insufficient balance
              </p>
            )}
          </div>

          <button 
            onClick={handleTransfer}
            disabled={isLoading || !isValidAddress || !amount || parseFloat(amount) <= 0 || !hasBalance}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {isLoading ? (
              <>
                <span className="loading"></span>
                Sending...
              </>
            ) : (
              'Send Private Transfer'
            )}
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Your Balance</h2>
            <p className="card-subtitle">Available private tokens for transfer</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Private Balance:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {formatted} ePUB
                </span>
              </div>
            </div>
            
            <div style={{ 
              padding: '1rem', 
              background: 'var(--surface)', 
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Privacy Features:
              </h3>
              <ul style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                paddingLeft: '1.5rem'
              }}>
                <li>Transfer amounts are hidden from blockchain events</li>
                <li>Only sender and recipient can see the amount</li>
                <li>Recipient can view transfers in their Inbox</li>
                <li>Optional viewing key for selective disclosure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


