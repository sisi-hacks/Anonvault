# 120s Demo Script

1. Setup
   - Have two wallets in your wallet app (A and B) on Avalanche Fuji.
   - Frontend .env.local configured with `NEXT_PUBLIC_EERC_TOKEN_ADDRESS` and `NEXT_PUBLIC_BRIDGE_ADDRESS`.

2. Faucet
   - Ensure wallet A has some AVAX for gas. Use official Fuji faucet.

3. Deposit
   - Connect wallet A on Home page.
   - Go to Deposit: enter `10` and click "Approve + Deposit".
   - Private balance should show `10`.

4. Send
   - Go to Send: set `To` = wallet B address, `Amount` = `3`.
   - Click "Send private".

5. Inbox
   - Switch RainbowKit to wallet B.
   - Open Inbox: you should see an item from wallet A, amount `3`.

6. Withdraw
   - Still on wallet B, open Withdraw: enter `1` → "Withdraw to my address".
   - This burns private balance and transfers `1` PUB to B (public ERC20).

7. Viewing Key
   - Open Settings: set a viewing key like `demo-key-123` and save.
   - Explain: this simulates selective disclosure for an auditor.

Done.
