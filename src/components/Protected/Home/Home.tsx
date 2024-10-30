'use client';

import { Avatar as TelegramAvatar, LargeTitle, Button, Card, Text, Headline } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';
import { useEquippedAvatar, useIsInBattleQueue, useBattleHistory, useQueueForBattle, useDequeueForBattle } from '@/hooks/useDappApi';
import './styles.css';
import { useSignal, initData } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const Home = () => {
  const { data: equippedAvatar, isLoading: avatarLoading } = useEquippedAvatar();
  const { data: isInQueue, isLoading: queueLoading } = useIsInBattleQueue();
  const { data: battleHistory, isLoading: historyLoading } = useBattleHistory();
  const queueMutation = useQueueForBattle();
  const dequeueMutation = useDequeueForBattle();
  const initDataState = useSignal(initData.state);
  const queryClient = useQueryClient();

  // Poll queue status every 10s when in queue
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isInQueue) {
      interval = setInterval(() => {
        queryClient.invalidateQueries({ queryKey: ['is_in_battle_queue'] });
        queryClient.invalidateQueries({ queryKey: ['battle_history'] });
      }, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInQueue, queryClient]);

  if (avatarLoading || queueLoading || historyLoading) {
    return <div>Loading...</div>;
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const queueForBattle = () => {
    if (isInQueue) {
      dequeueMutation.mutate();
    } else {
      queueMutation.mutate();
    }
  };

  return (
    <Page back={false}>
      <div className="home_avatarContainer">
        <TelegramAvatar 
          size={96} 
          src={equippedAvatar?.image}
          className="home_mainAvatar"
        />

        <LargeTitle>
          gm {initDataState?.user?.username || initDataState?.user?.firstName} 👋
        </LargeTitle>
      </div>

      <div className="home_battleSection">
        <Button 
          onClick={queueForBattle}
          loading={queueMutation.isPending || dequeueMutation.isPending}
        >
          {isInQueue === true ? 'Leave Queue' : 'Battle'}
        </Button>

        {isInQueue === true && (
          <Text className="home_queueMessage">
            You are in the battle queue. Waiting for opponent...
          </Text>
        )}
      </div>

      <div className="home_battleHistory">
        <Headline>Battle History</Headline>
        
        {battleHistory && battleHistory.length > 0 ? (
          battleHistory.map((battle, index) => (
            <Card key={index} className={`home_battleCard ${battle.won ? 'home_battleWon' : 'home_battleLost'}`}>
              <div className="home_battleInfo">
                <Text Component="strong">
                  {battle.won ? '🏆 Victory' : '💔 Defeat'}
                </Text>
                <Text className="home_battleTime">
                  {formatDate(battle.timestamp)}
                </Text>
              </div>
              <Text className="home_battleDetails">
                vs {battle.opponent.collection} #{battle.opponent.token_id}
              </Text>
            </Card>
          ))
        ) : (
          <Text className="home_noBattles">No battles yet</Text>
        )}
      </div>
    </Page>
  );
}

export default Home;
