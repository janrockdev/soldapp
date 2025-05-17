# Solana Dapp Template (NextJS)

Preview: [Demo](https://soldapp-theta.vercel.app/)

## Features
[x] Connect wallet button
[x] Solana faucet button
[x] Send SOL to a wallet
[x] Wallet transaction history - realtime
[x] FMP API - BTC/SUI/SOL price - realtime


```bash
npx create-next-app@latest soldapp --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd soldapp
npx shadcn@latest init
npx shadcn@latest add button card sheet table input label
npm install lucide-react
npm install @solana/wallet-adapter-base@latest @solana/wallet-adapter-react@latest @solana/wallet-adapter-react-ui@latest @solana/wallet-adapter-wallets@latest @solana/web3.js@latest --legacy-peer-deps
npm install @solana/wallet-adapter-react-ui --legacy-peer-deps
npm install chart.js react-chartjs-2
#rm -rf node_modules package-lock.json .next
#npm cache clean --force
#npm install
export NEXT_PUBLIC_FMP_API_KEY=<key from https://financialmodelingprep.com/>
npm run dev
```