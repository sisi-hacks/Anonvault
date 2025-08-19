"use client";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { avalancheFuji } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useMemo } from "react";

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc";
  const wcProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo";

  const config = useMemo(() => {
    return getDefaultConfig({
      appName: "eERC20 MVP",
      projectId: wcProjectId,
      chains: [avalancheFuji],
      transports: { [avalancheFuji.id]: http(rpcUrl) },
      ssr: true
    });
  }, [wcProjectId, rpcUrl]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}


