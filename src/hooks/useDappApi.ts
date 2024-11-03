import { useChromia } from '@/libs/chromia-connect/chromia-context';
import { nop, op } from '@chromia/ft4';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

      const avatar = await chromiaSession.query<Avatar>('pfps.get_equipped', {
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

export type LeaderboardEntry = {
  avatar: Contender;
  wins: number;
}

export function useLeaderboard() {
  const { chromiaSession, chromiaClient, authStatus } = useChromia();

  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      const leaderboard = await chromiaSession.query<LeaderboardEntry[]>('battles.get_leaderboard');
      
      return leaderboard.map(entry => ({
        ...entry,
        avatar: {
          ...entry.avatar,
          image: convertToGatewayUrl(entry.avatar.image)
        }
      }));
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

      const avatars = await chromiaSession.query<Avatar[]>('pfps.get_all', {
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

      const equipments = await chromiaSession.query<(Armor | Weapon)[]>('equipments.get_equipped_equipment', {
        account_id: chromiaSession.account.id,
      });

      console.log('equipped equipment', equipments);
      
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

      console.log('slot', slot);
      console.log('account_id', chromiaSession.account.id.toString('hex'));
      const armors = await chromiaSession.query<Armor[]>('equipments.get_armor', {
        account_id: chromiaSession.account.id,
        slot,
      });

      console.log('armors', armors);
      
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

      const weapons = await chromiaSession.query<Weapon[]>('equipments.get_weapon', {
        account_id: chromiaSession.account.id,
      });

      console.log('weapons', weapons);
      
      return weapons.map(weapon => ({
        ...weapon,
        image: weapon.image ? convertToGatewayUrl(weapon.image) : undefined
      }));
    },
    enabled: Boolean(chromiaClient) && Boolean(chromiaSession) && authStatus === 'connected',
  });
}

// Example of a mutation to equip an avatar
export function useEquipAvatar() {
  const { chromiaSession, chromiaClient } = useChromia();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ project, collection, tokenId }: { 
      project: string; 
      collection: string; 
      tokenId: number; 
    }) => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      await chromiaSession.transactionBuilder()
        .add(op('equipments.equip', project, collection, tokenId))
        .add(nop())
        .buildAndSend();
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries({ queryKey: ['equipped_avatar'] });
      queryClient.invalidateQueries({ queryKey: ['all_avatars'] });
    },
  });
}

export function useEquipEquipment() {
  const { chromiaSession, chromiaClient } = useChromia();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ project, collection, tokenId }: { 
      project: string; 
      collection: string; 
      tokenId: number; 
    }) => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      await chromiaSession.transactionBuilder()
        .add(op('equipments.equip', project, collection, tokenId))
        .add(nop())
        .buildAndSend();
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries({ queryKey: ['equipped_equipment'] });
      queryClient.invalidateQueries({ queryKey: ['all_armor'] });
      queryClient.invalidateQueries({ queryKey: ['all_weapons'] });
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
    },
  });
}

export type Attributes = {
  health: number;
  defense: number;
  damage: number;
  weight: number;
}

export function useAttributes() {
  const { chromiaSession, chromiaClient, authStatus } = useChromia();

  return useQuery({
    queryKey: ['attributes'],
    queryFn: async () => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      const attributes = await chromiaSession.query<Attributes>('battles.get_attributes', {
        account_id: chromiaSession.account.id,
      });
      
      return attributes;
    },
    enabled: Boolean(chromiaClient) && Boolean(chromiaSession) && authStatus === 'connected',
  });
}

export function useIsInBattleQueue() {
  const { chromiaSession, chromiaClient, authStatus } = useChromia();

  return useQuery({
    queryKey: ['is_in_battle_queue'],
    queryFn: async () => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      const isInQueue = await chromiaSession.query<number>('battles.is_queued', {
        account_id: chromiaSession.account.id,
      });
      
      return isInQueue > 0;
    },
    enabled: Boolean(chromiaClient) && Boolean(chromiaSession) && authStatus === 'connected',
  });
}

export type Contender = {
  project: string;
  collection: string;
  token_id: number;
  name: string;
  image: string;
}

export type BattleHistory = {
  avatar: Contender;
  opponent: Contender;
  won: number;
  timestamp: number;
}

export function useBattleHistory() {
  const { chromiaSession, chromiaClient, authStatus } = useChromia();

  return useQuery({
    queryKey: ['battle_history'],
    queryFn: async () => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      const battleHistory = await chromiaSession.query<BattleHistory[]>('battles.get_history', {
        account_id: chromiaSession.account.id,
      });
      
      return battleHistory;
    },
    enabled: Boolean(chromiaClient) && Boolean(chromiaSession) && authStatus === 'connected',
  });
}

export function useDequeueForBattle() {
  const { chromiaSession, chromiaClient } = useChromia();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      await chromiaSession.transactionBuilder()
        .add(op('battles.dequeue'))
        .add(nop())
        .buildAndSend();
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries({ queryKey: ['is_in_battle_queue'] });
    },
  });
}
export function useQueueForBattle() {
  const { chromiaSession, chromiaClient } = useChromia();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!chromiaClient || !chromiaSession) {
        throw new Error('Not connected to Chromia');
      }

      await chromiaSession.transactionBuilder()
        .add(op('battles.enqueue'))
        .add(nop())
        .buildAndSend();
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries({ queryKey: ['is_in_battle_queue'] });
      queryClient.invalidateQueries({ queryKey: ['battle_history'] });
    },
  });
}