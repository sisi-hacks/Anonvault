"use client";
import { useState } from "react";
import { useExportKey } from "@/lib/eerc";

export default function SettingsPage() {
  const [key, setKey] = useState("");
  const { setViewingKey } = useExportKey();

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2>Settings</h2>
      <label>
        Viewing Key
        <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="my-secret-viewing-key" />
      </label>
      <button onClick={() => setViewingKey(key)}>Save key</button>
      <p>Share this key with auditors to disclose your balances and inbox off-chain.</p>
    </div>
  );
}


