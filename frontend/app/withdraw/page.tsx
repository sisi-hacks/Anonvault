"use client";
import { useState } from "react";
import { useWithdraw, usePrivateBalance } from "@/lib/eerc";
import { useAccount } from "wagmi";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const { withdraw } = useWithdraw();
  const { address } = useAccount();
  const { formatted } = usePrivateBalance(address as `0x${string}`);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2>Withdraw</h2>
      <div>Private balance: {formatted}</div>
      <label>
        Amount
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1.0" />
      </label>
      <button onClick={() => withdraw(amount)}>Withdraw to my address</button>
    </div>
  );
}


