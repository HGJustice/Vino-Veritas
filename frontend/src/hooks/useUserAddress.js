import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function useUserAddress() {
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
      } catch (error) {
        console.error('Error fetching user address:', error);
      }
    };

    fetchAddress();
  }, []);

  return userAddress;
}
