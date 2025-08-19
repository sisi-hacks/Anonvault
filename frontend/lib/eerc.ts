"use client";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits, Hex } from "viem";
import { mockERC20Abi, bridgeAbi } from "@/lib/abi";

const BRIDGE = process.env.NEXT_PUBLIC_BRIDGE_ADDRESS as `0x${string}`;
const TOKEN = process.env.NEXT_PUBLIC_EERC_TOKEN_ADDRESS as `0x${string}`;

export function useDeposit() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  async function approveAndDeposit(amount: string) {
    const value = parseUnits(amount, 18);
    await writeContractAsync({
      address: TOKEN,
      abi: mockERC20Abi as any,
      functionName: "approve",
      args: [BRIDGE, value]
    });
    await writeContractAsync({
      address: BRIDGE,
      abi: bridgeAbi as any,
      functionName: "deposit",
      args: [value]
    });
  }

  return { approveAndDeposit };
}

export function useTransfer() {
  const { writeContractAsync } = useWriteContract();
  async function transfer(to: `0x${string}`, amount: string) {
    const value = parseUnits(amount, 18);
    await writeContractAsync({ address: BRIDGE, abi: bridgeAbi as any, functionName: "transferPrivate", args: [to, value] });
  }
  return { transfer };
}

export function useWithdraw() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  async function withdraw(amount: string, to?: `0x${string}`) {
    const value = parseUnits(amount, 18);
    await writeContractAsync({ address: BRIDGE, abi: bridgeAbi as any, functionName: "withdraw", args: [value, to || (address as `0x${string}`)] });
  }
  return { withdraw };
}

export function useInbox(user?: `0x${string}`) {
  const { address } = useAccount();
  const { data, refetch, isFetching } = useReadContract({
    address: BRIDGE,
    abi: bridgeAbi as any,
    functionName: "getInbox",
    args: [user || (address as `0x${string}`)],
    query: { enabled: !!(user || address) }
  });

  return { items: (data as any[]) || [], refetch, isFetching };
}

export function usePrivateBalance(user?: `0x${string}`) {
  const { address } = useAccount();
  const { data, refetch } = useReadContract({
    address: BRIDGE,
    abi: bridgeAbi as any,
    functionName: "getPrivateBalance",
    args: [user || (address as `0x${string}`)],
    query: { enabled: !!(user || address) }
  });
  const balance = data ? (data as bigint) : 0n;
  return { balance, formatted: formatUnits(balance, 18), refetch };
}

export function useExportKey() {
  const { writeContractAsync } = useWriteContract();
  async function setViewingKey(key: string) {
    await writeContractAsync({ address: BRIDGE, abi: bridgeAbi as any, functionName: "setViewingKey", args: [key] });
  }
  return { setViewingKey };
}


