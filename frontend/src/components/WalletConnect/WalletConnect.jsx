import React, { useState, useEffect } from 'react';
import { Core } from '@walletconnect/core';
import { WalletKit } from '@reown/walletkit';

const WalletConnect = () => {
  const [walletKit, setWalletKit] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const initWalletKit = async () => {
      const core = new Core({
        projectId: 'e3cb6f5630b5940a20fdfd2b19314321',
      });

      const kit = await WalletKit.init({
        core,
        metadata: {
          name: 'My Dapp',
          description: 'My Dapp Description',
          url: 'https://mydapp.com',
          icons: ['https://mydapp.com/icon.png'],
        },
      });

      setWalletKit(kit);
    };

    initWalletKit();
  }, []);

  const connectWallet = async () => {
    if (!walletKit) return;

    try {
      const { uri, approval } = await walletKit.connect({
        requiredNamespaces: {
          eip155: {
            methods: ['eth_sendTransaction', 'personal_sign'],
            chains: ['eip155:1'],
            events: ['chainChanged', 'accountsChanged'],
          },
        },
      });

      // Open QR Code modal or deep link to wallet
      console.log('Connection URI:', uri);

      const session = await approval();
      setSession(session);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const disconnectWallet = async () => {
    if (!walletKit || !session) return;

    await walletKit.disconnect({
      topic: session.topic,
      reason: { code: 6000, message: 'User disconnected' },
    });

    setSession(null);
  };

  return (
    <div>
      {session ? (
        <div>
          <p>Connected to {session.peer.metadata.name}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
