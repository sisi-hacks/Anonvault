"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function HomePage() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1>eERC20 Privacy Donations MVP</h1>
      <ConnectButton />
      <p>
        This is a demo using a mock private bridge. Use Avalanche Fuji. Get AVAX
        from the official faucet and any ERC20 test token if needed.
      </p>
      <ol>
        <li>Deposit page: approve and deposit ERC20 into the bridge.</li>
        <li>Send page: make a private transfer to a recipient.</li>
        <li>Inbox: recipient can view received amounts.</li>
        <li>Withdraw: redeem eERC20 back to public ERC20.</li>
        <li>Settings: export/set your viewing key.</li>
      </ol>
    </div>
  );
}


