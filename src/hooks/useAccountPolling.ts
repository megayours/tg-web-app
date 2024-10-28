import { useChromia } from '@/libs/chromia-connect/chromia-context';
import { useAccount } from 'wagmi';
import { createKeyStoreInteractor, createWeb3ProviderEvmKeyStore, Eip1193Provider } from '@chromia/ft4';
import { useQuery } from '@tanstack/react-query';

export function useAccountPolling(shouldPoll: boolean) {
  const { chromiaClient } = useChromia();
  const { connector, isConnected } = useAccount();

  return useQuery({
    queryKey: ['checkAccount'],
    queryFn: async () => {
      if (!chromiaClient || !connector || !isConnected) {
        return false;
      }

      try {
        const provider = await connector.getProvider();
        const evmKeyStore = await createWeb3ProviderEvmKeyStore(provider as Eip1193Provider);
        const keyStoreInteractor = createKeyStoreInteractor(chromiaClient, evmKeyStore);
        const accounts = await keyStoreInteractor.getAccounts();
        
        return accounts.length > 0;
      } catch (error) {
        console.error('Error checking account:', error);
        return false;
      }
    },
    enabled: shouldPoll && isConnected,
    refetchInterval: shouldPoll ? 2000 : false, // Poll every 2 seconds when enabled
    retry: true,
    retryDelay: 1000,
  });
}
