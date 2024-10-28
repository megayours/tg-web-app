'use client';

import { Section, Cell, List, Avatar as TelegramAvatar, Text, LargeTitle } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';
import { useEquippedAvatar } from '@/hooks/useDappApi';
import './styles.css';
import { useSignal, initData } from '@telegram-apps/sdk-react';

export default function Home() {
  const { data: equippedAvatar, isLoading } = useEquippedAvatar();
  const initDataState = useSignal(initData.state);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    </Page>
  );
}
