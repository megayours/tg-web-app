import { useChromia } from '@/libs/chromia-connect/chromia-context';
import { useQuery } from '@tanstack/react-query';

export type BaseToken = {
  project: string;
  collection: string;
  id: string;
  name: string;
  description: string;
  image: string;
}

export type Avatar = BaseToken & {}

export type Equipment = BaseToken & {
  slot: string;
  weight: number;
}

export type Armor = Equipment & {
  defense: number;
}

export type Weapon = Equipment & {
  damage: number;
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

export function useEquippedEquipment() {
  const { chromiaSession, chromiaClient, authStatus } = useChromia();

  return useQuery({
    queryKey: ['equipped_equipment'],
    queryFn: async () => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      const equipments = await chromiaSession.query<(Armor | Weapon)[]>('dapp.get_equipped_equipment', {
        account_id: chromiaSession.account.id,
      });

      console.log(`equipped for account ${chromiaSession.account.id.toString('hex')}:`, equipments);
      
      return equipments.map((equipment: Armor | Weapon) => ({
        ...equipment,
        image: equipment.image ? convertToGatewayUrl(equipment.image) : undefined
      }));
    },
    enabled: Boolean(chromiaClient) && Boolean(chromiaSession) && authStatus === 'connected',
  });
}

export function useAllArmor(slot: string) {
  const { chromiaSession, chromiaClient, authStatus } = useChromia();

  return useQuery({
    queryKey: ['all_armor', slot],
    queryFn: async () => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      const armors = await chromiaSession.query<Armor[]>('dapp.get_armor', {
        account_id: chromiaSession.account.id,
        slot,
      });
      
      return armors.map(armor => ({
        ...armor,
        image: armor.image ? convertToGatewayUrl(armor.image) : undefined
      }));
    },
    enabled: Boolean(chromiaClient) && Boolean(chromiaSession) && authStatus === 'connected',
  });
}

export function useAllWeapons() {
  const { chromiaSession, chromiaClient, authStatus } = useChromia();

  return useQuery({
    queryKey: ['all_weapons'],
    queryFn: async () => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      const weapons = await chromiaSession.query<Weapon[]>('dapp.get_weapon', {
        account_id: chromiaSession.account.id,
      });
      
      return weapons.map(weapon => ({
        ...weapon,
        image: weapon.image ? convertToGatewayUrl(weapon.image) : undefined
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
