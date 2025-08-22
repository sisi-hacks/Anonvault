"use client";
import { useInbox, usePrivateBalance } from "@/lib/eerc";
import { useAccount } from "wagmi";

export default function InboxPage() {
  const { address } = useAccount();
  const { items, refetch, isFetching } = useInbox(address as `0x${string}`);
  const { formatted } = usePrivateBalance(address as `0x${string}`);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Inbox</h1>
        <p className="page-subtitle">
          View your received private transfers and manage your incoming tokens
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Received Transfers</h2>
            <p className="card-subtitle">
              {items.length === 0 ? "No incoming transfers yet" : `${items.length} transfer${items.length !== 1 ? 's' : ''} received`}
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {isFetching ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <span className="loading"></span>
              </div>
            ) : items.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem',
                color: 'var(--text-secondary)'
              }}>
                <p>No transfers received yet.</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Ask someone to send you private tokens to see them here.
                </p>
              </div>
            ) : (
              items.map((item: any, idx: number) => (
                <div 
                  key={idx}
                  style={{
                    padding: '1rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    background: 'var(--surface)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                      {Number(item.amount) / 1e18} ePUB
                    </span>
                    <span className="status status-success">Received</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <div>From: {item.from}</div>
                    <div>Time: {new Date(Number(item.timestamp) * 1000).toLocaleString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Your Balance</h2>
            <p className="card-subtitle">Total private tokens available</p>
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
                What you can do:
              </h3>
              <ul style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                paddingLeft: '1.5rem'
              }}>
                <li>View all received private transfers</li>
                <li>See sender addresses and amounts</li>
                <li>Withdraw tokens back to public PUB</li>
                <li>Set viewing key for selective disclosure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


