import { useCallback } from 'react';
import { useWriteContract, useAccount, useSimulateContract, useSwitchChain, useChainId, useConfig } from 'wagmi';
import { CONTRACTS } from '../config/contracts';
import { type Address } from 'viem';
import { polygonAmoy } from '@/config/networks';

export function useMintNFT(contractAddress: Address) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const isCorrectChain = chainId === polygonAmoy.id;

  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: contractAddress,
    abi: CONTRACTS.MEGA_NFT.abi,
    functionName: 'mint',
    args: [address as Address],
    chainId: polygonAmoy.id,
    query: {
      enabled: Boolean(isConnected && address && isCorrectChain),
      retry: false,
    },
  });

  const { writeContract, isPending, isSuccess, data: hash, error: writeError } = useWriteContract();

  const handleAddNetwork = async () => {
    try {
      // @ts-ignore - ethereum is injected by the wallet
      await window.ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${polygonAmoy.id.toString(16)}`,
            chainName: polygonAmoy.name,
            nativeCurrency: polygonAmoy.nativeCurrency,
            rpcUrls: polygonAmoy.rpcUrls.public.http,
            blockExplorerUrls: [polygonAmoy.blockExplorers?.default.url],
          },
        ],
      });
    } catch (error) {
      console.error('Error adding network:', error);
    }
  };

  const handleMint = useCallback(async () => {
    if (!address) return;
    
    try {
      // Try to switch chain first
      if (!isCorrectChain) {
        try {
          await switchChain({ chainId: polygonAmoy.id });
        } catch (error: any) {
          // If the error indicates the chain hasn't been added, try to add it
          if (error.message?.includes('Unrecognized chain')) {
            await handleAddNetwork();
            // Try switching again after adding
            await switchChain({ chainId: polygonAmoy.id });
          } else {
            throw error;
          }
        }
        return; // Return here as the chain switch will trigger a re-render
      }

      if (!simulateData?.request) return;
      
      writeContract({
        ...simulateData.request,
        account: address,
        chainId: polygonAmoy.id,
      });
    } catch (error) {
      console.error('Mint error:', error);
    }
  }, [simulateData, writeContract, address, isCorrectChain, switchChain]);

  const getError = () => {
    if (!isConnected) return 'Please connect your wallet';
    if (!isCorrectChain) return `Please switch to ${polygonAmoy.name} network`;
    if (writeError) return 'Transaction error: ' + writeError.message;
    if (simulateError) {
      // Check if it's a simulation error that we can ignore
      if (simulateError.message.includes('returned no data')) {
        return null; // This is expected for some void functions
      }
      return 'Error preparing transaction: ' + simulateError.message;
    }
    return null;
  };

  // Consider transaction ready even if simulation returns no data
  const isReadyToMint = Boolean(
    isConnected && 
    address &&
    (!simulateError || simulateError.message.includes('returned no data'))
  );

  return {
    mint: handleMint,
    isMinting: isPending,
    isMinted: isSuccess,
    transactionHash: hash,
    isReady: isReadyToMint,
    error: getError(),
    isCorrectChain,
  };
}
