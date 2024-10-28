import { useChromia } from '@/libs/chromia-connect/chromia-context';
import { useQuery } from '@tanstack/react-query';

export type Avatar = {
  id: string;
  name: string;
  image: string;
  project: string;
  collection: string;
  token_id: string;
}

// Helper function to convert IPFS URL to gateway URL
const convertToGatewayUrl = (ipfsUrl: string): string => {
  console.log('ipfsUrl', ipfsUrl);
  if (!ipfsUrl.startsWith('ipfs://')) return ipfsUrl;
  return `https://ipfs.io/ipfs/${ipfsUrl.replace('ipfs://', '')}`;
};

export function useEquippedAvatar() {
  const { chromiaSession, chromiaClient, authStatus } = useChromia();

  return useQuery({
    queryKey: ['equipped_avatar'],
    queryFn: async () => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      const avatar = await chromiaSession.query<Avatar>('dapp.get_equipped_avatar', {
        account_id: chromiaSession.account.id,
      });

      console.log(`equipped for account ${chromiaSession.account.id.toString('hex')}:`, avatar);
      
      return {
        ...avatar,
        image: convertToGatewayUrl(avatar.image)
      };
    },
    enabled: Boolean(chromiaClient) && Boolean(chromiaSession) && authStatus === 'connected',
  });
}

export function useAllAvatars() {
  const { chromiaSession, chromiaClient, authStatus } = useChromia();

  return useQuery({
    queryKey: ['all_avatars'],
    queryFn: async () => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      const avatars = await chromiaSession.query<Avatar[]>('dapp.get_avatars', {
        account_id: chromiaSession.account.id,
      });
      
      return avatars.map(avatar => ({
        ...avatar,
        image: convertToGatewayUrl(avatar.image)
      }));
    },
    enabled: Boolean(chromiaClient) && Boolean(chromiaSession) && authStatus === 'connected',
  });
}

// Example of a mutation to equip an avatar
// export function useEquipAvatar() {
//   const { chromiaSession, chromiaClient } = useChromia();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (avatarId: string) => {
//       if (!chromiaClient || !chromiaSession) {
//         throw new Error('Not connected to Chromia');
//       }

//       await chromiaClient.operation('equip_avatar', {
//         session: chromiaSession,
//         avatar_id: avatarId,
//       });
//     },
//     onSuccess: () => {
//       // Invalidate relevant queries after successful mutation
//       queryClient.invalidateQueries({ queryKey: ['equipped_avatar'] });
//       queryClient.invalidateQueries({ queryKey: ['all_avatars'] });
//     },
//   });
// }
