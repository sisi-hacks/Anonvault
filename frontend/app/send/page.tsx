"use client";
import { useState } from "react";
import { useTransfer } from "@/lib/eerc";

export default function SendPage() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const { transfer } = useTransfer();

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2>Send</h2>
      <label>
        To
        <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="0x..." />
      </label>
      <label>
        Amount
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1.0" />
      </label>
      <button onClick={() => transfer(to as `0x${string}`, amount)}>Send private</button>
    </div>
  );
}


