"use client";
import { useState } from "react";
import { useDeposit, usePrivateBalance } from "@/lib/eerc";
import { useAccount } from "wagmi";

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { approveAndDeposit } = useDeposit();
  const { address } = useAccount();
  const { formatted, refetch } = usePrivateBalance(address as `0x${string}`);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsLoading(true);
    try {
      await approveAndDeposit(amount);
      setAmount("");
      refetch();
    } catch (error) {
      console.error("Deposit failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Deposit Tokens</h1>
        <p className="page-subtitle">
          Convert your public PUB tokens to private eERC20 tokens for anonymous transfers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Deposit to Private</h2>
            <p className="card-subtitle">Approve and deposit PUB tokens to start private transfers</p>
          </div>
          
          <div className="form-group">
            <label className="form-label">Amount to Deposit</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10.0"
              className="form-input"
              step="0.1"
              min="0"
            />
          </div>

          <button 
            onClick={handleDeposit}
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {isLoading ? (
              <>
                <span className="loading"></span>
                Processing...
              </>
            ) : (
              'Approve & Deposit'
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
                How it works:
              </h3>
              <ul style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                paddingLeft: '1.5rem'
              }}>
                <li>Approve the bridge to spend your PUB tokens</li>
                <li>Deposit converts PUB to private ePUB tokens</li>
                <li>Private tokens can be transferred anonymously</li>
                <li>Withdraw converts ePUB back to public PUB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


