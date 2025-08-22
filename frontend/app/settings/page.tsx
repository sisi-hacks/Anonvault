"use client";
import { useState } from "react";
import { useExportKey } from "@/lib/eerc";

export default function SettingsPage() {
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedKey, setSavedKey] = useState("");
  const { setViewingKey } = useExportKey();

  const handleSetKey = async () => {
    if (!key.trim()) return;
    
    setIsLoading(true);
    try {
      await setViewingKey(key);
      setSavedKey(key);
      setKey("");
    } catch (error) {
      console.error("Failed to set viewing key:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (savedKey) {
      navigator.clipboard.writeText(savedKey);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">
          Manage your viewing key for selective disclosure and privacy controls
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Viewing Key</h2>
            <p className="card-subtitle">Set a key for selective disclosure to auditors</p>
          </div>
          
          <div className="form-group">
            <label className="form-label">Viewing Key</label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="my-secret-viewing-key"
              className="form-input"
            />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              This key allows auditors to decrypt your balances and transfers
            </p>
          </div>

          <button 
            onClick={handleSetKey}
            disabled={isLoading || !key.trim()}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {isLoading ? (
              <>
                <span className="loading"></span>
                Saving...
              </>
            ) : (
              'Save Viewing Key'
            )}
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Current Key</h2>
            <p className="card-subtitle">Your saved viewing key for disclosure</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {savedKey ? (
              <div>
                <div style={{ 
                  padding: '1rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  wordBreak: 'break-all'
                }}>
                  {savedKey}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="btn btn-secondary"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  Copy to Clipboard
                </button>
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem',
                color: 'var(--text-secondary)'
              }}>
                <p>No viewing key set yet.</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Set a key to enable selective disclosure.
                </p>
              </div>
            )}
            
            <div style={{ 
              padding: '1rem', 
              background: 'var(--surface)', 
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                How viewing keys work:
              </h3>
              <ul style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                paddingLeft: '1.5rem'
              }}>
                <li>Share this key with auditors for compliance</li>
                <li>Allows them to decrypt your private balances</li>
                <li>Enables selective disclosure of transaction history</li>
                <li>Maintains privacy while enabling transparency</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


