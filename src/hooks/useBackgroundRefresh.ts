import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function useAvatarAndEquipmentBackgroundRefresh(intervalMs: number = 10000) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      // Refresh all collection queries
      queryClient.invalidateQueries({ queryKey: ['all_armor'] });
      queryClient.invalidateQueries({ queryKey: ['all_avatars'] });
      queryClient.invalidateQueries({ queryKey: ['all_weapons'] });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [queryClient, intervalMs]);
} 