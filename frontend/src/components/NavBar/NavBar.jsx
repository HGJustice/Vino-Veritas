import React from 'react';
import { Link } from 'react-router-dom';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

import './NavBar.css';

const projectId = 'dd76b39698587fb008d94862ed84f9f5';

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};

const optimism = {
  chainId: 11155420,
  name: 'Optimism Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia-optimism.etherscan.io/',
  rpcUrl: 'https://sepolia.optimism.io',
};

const moonbase = {
  chainId: 1287,
  name: 'MoonBase Alpha',
  currency: 'DEV',
  explorerUrl: 'https://moonbase.moonscan.io/',
  rpcUrl: 'https://rpc.api.moonbase.moonbeam.network',
};

const arbitrumSepolia = {
  chainId: 421614,
  name: 'Arbitrum Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.arbiscan.io/',
  rpcUrl: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public ',
};

const metadata = {
  name: 'wine-to-chain',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const ethersConfig = defaultConfig({
  metadata,

  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: '...',
  defaultChainId: 1,
});

createWeb3Modal({
  ethersConfig,
  chains: [mainnet, optimism, moonbase, arbitrumSepolia],
  projectId,
});

export default function NavBar() {
  return (
    <nav className="navBar__container">
      <div>
        <ul className="navBar__selection">
          <li className="navBar__links">
            <Link to="/" className="logo">
              <h2>
                <span className="wine-icon">🍷</span> Wine-To-Chain
              </h2>
            </Link>
          </li>
          <li className="navBar__links">
            <Link to="/displayWineries" reloadDocument>
              Wineries
            </Link>
          </li>

          <li className="navBar__links">
            <Link to="/map" reloadDocument>
              Map
            </Link>
          </li>
          <li className="navBar__links">
            <Link to="/traceability" reloadDocument>
              Traceability
            </Link>
          </li>
          <li className="navBar__links">
            <Link to="/wineList" reloadDocument>
              QR Code
            </Link>
          </li>
          <li className="navBar__connectButton">
            <w3m-button />
          </li>
        </ul>
      </div>
    </nav>
  );
}
