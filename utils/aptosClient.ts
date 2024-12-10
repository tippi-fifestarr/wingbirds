// utils/aptosClient.ts
import { AptosConfig, Network, Aptos } from "@aptos-labs/ts-sdk";

export const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
export const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;

// You might want this configurable based on environment
const config = new AptosConfig({ network: Network.TESTNET });
export const aptosClient = new Aptos(config);