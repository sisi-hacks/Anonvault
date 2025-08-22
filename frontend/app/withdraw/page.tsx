"use client";
import { useState } from "react";
import { useWithdraw, usePrivateBalance } from "@/lib/eerc";
import { useAccount } from "wagmi";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { withdraw } = useWithdraw();
  const { address } = useAccount();
  const { formatted, refetch } = usePrivateBalance(address as `0x${string}`);

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsLoading(true);
    try {
      await withdraw(amount);
      setAmount("");
      refetch();
    } catch (error) {
      console.error("Withdraw failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasBalance = parseFloat(formatted) >= parseFloat(amount || "0");

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Withdraw Tokens</h1>
        <p className="page-subtitle">
          Convert your private eERC20 tokens back to public PUB tokens
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Withdraw to Public</h2>
            <p className="card-subtitle">Convert private tokens back to public PUB tokens</p>
          </div>
          
          <div className="form-group">
            <label className="form-label">Amount to Withdraw</label>
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
            onClick={handleWithdraw}
            disabled={isLoading || !amount || parseFloat(amount) <= 0 || !hasBalance}
            className="btn btn-success"
            style={{ width: '100%' }}
          >
            {isLoading ? (
              <>
                <span className="loading"></span>
                Processing...
              </>
            ) : (
              'Withdraw to My Address'
            )}
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Your Balances</h2>
            <p className="card-subtitle">Current private token balance</p>
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
                Withdrawal Process:
              </h3>
              <ul style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                paddingLeft: '1.5rem'
              }}>
                <li>Burns your private ePUB tokens</li>
                <li>Releases equivalent PUB tokens to your wallet</li>
                <li>PUB tokens become visible on public blockchain</li>
                <li>Can be traded or transferred normally</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


