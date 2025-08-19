# eERC20 Privacy Donations MVP (Avalanche Fuji)

Minimal hackathon scaffold demonstrating a privacy-preserving donation/payment flow using a mock Encrypted ERC-20 (eERC20) on Avalanche Fuji testnet.

This repo contains:
- `contracts/` Hardhat project with `MockERC20` and `MockEERC20Bridge` (simulated private transfers, inbox, viewing key export)
- `frontend/` Next.js (App Router, TS) with wagmi, viem, RainbowKit, and an SDK wrapper `lib/eerc.ts`

Note: This is a demo. No real cryptography. Amounts are hidden from events and UI without a viewing key, but stored plainly on-chain.

## MVP Goals
1. Deposit ERC20 → mint eERC20 (1:1)
2. Private transfer of eERC20 between wallets (amount hidden in events)
3. Recipient inbox to view received funds
4. Withdraw eERC20 back to public ERC20
5. Export viewing key for selective disclosure/auditing

## Quickstart

### Prereqs
- Node.js 18+
- npm or pnpm
- Avalanche Fuji RPC URL and a funded testnet wallet

### Deploy contracts

```bash
cd contracts
# create .env
cat > .env << EOF
RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
PRIVATE_KEY=0xYOUR_FUJI_PRIVATE_KEY
EOF

npm install
npm run build
npm run deploy
```
Copy the printed addresses into `frontend/.env.local`.

### Run frontend

```bash
cd ../frontend
cp .env.local.example .env.local
# Edit EERC_TOKEN_ADDRESS and BRIDGE_ADDRESS from deploy output
npm install
npm run dev
```
Visit http://localhost:3000.

## Frontend pages
- Home: connect wallet + faucet instructions
- Deposit: approve + deposit public ERC20 to bridge
- Send: private transfer
- Inbox: received incoming transfers
- Withdraw: burn eERC20 → redeem public ERC20
- Settings: set/export viewing key

## Roadmap
- Replace mock privacy with real eERC circuits and proofs (see reference below)
- Add auditor role and selective disclosure with encrypted memo
- Batch proofs and improved UX for fees / gas abstraction
- Off-chain inbox indexing and notifications

## References
- EncryptedERC (eERC) concept and flows inspired by: [eerc-backend-converter](https://github.com/alejandro99so/eerc-backend-converter)
