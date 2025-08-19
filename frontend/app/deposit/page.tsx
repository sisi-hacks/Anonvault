"use client";
import { useState } from "react";
import { useDeposit, usePrivateBalance } from "@/lib/eerc";
import { useAccount } from "wagmi";

export default function DepositPage() {
  const [amount, setAmount] = useState("0.0");
  const { approveAndDeposit } = useDeposit();
  const { address } = useAccount();
  const { formatted } = usePrivateBalance(address as `0x${string}`);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2>Deposit</h2>
      <label>
        Amount
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="10" />
      </label>
      <button onClick={() => approveAndDeposit(amount)}>Approve + Deposit</button>
      <div>Private balance: {formatted}</div>
    </div>
  );
}


