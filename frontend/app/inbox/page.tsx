"use client";
import { useInbox } from "@/lib/eerc";
import { useAccount } from "wagmi";

export default function InboxPage() {
  const { address } = useAccount();
  const { items } = useInbox(address as `0x${string}`);
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2>Inbox</h2>
      {items.length === 0 ? (
        <div>No incoming transfers.</div>
      ) : (
        <ul>
          {items.map((it: any, idx: number) => (
            <li key={idx}>
              From {it.from} — amount {Number(it.amount) / 1e18} — at {new Date(Number(it.timestamp) * 1000).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


