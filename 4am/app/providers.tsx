"use client";

import React, { ReactNode } from "react";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme 
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const projectId = "effed73ceee99d947720919370f0f035";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "AXXIS",
  projectId,
  chains,
});

const appInfo = {
  appName: "AXXIS",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig} >
      <RainbowKitProvider 
         theme={darkTheme({
          accentColor: '#f2f2f2',
          accentColorForeground: '#121212',
          borderRadius: 'small',
          // overlayBlur: 'none',
          fontStack: 'system',
        })}
        chains={chains}
        appInfo={appInfo}
        coolMode
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;