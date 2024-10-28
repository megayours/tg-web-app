'use client';

import { Section, Cell, List, Avatar as TelegramAvatar, Text } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';
import { useAllAvatars } from '@/hooks/useDappApi';
import './styles.css';

export default function Profile() {
  const { data: avatars, isLoading } = useAllAvatars();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      <List>
        <Section header="Your Collection">
          {avatars?.map(avatar => (
            <div key={avatar.id} className="profile_avatarCard">
              <div className="profile_avatarHeader">
                <TelegramAvatar 
                  size={48} 
                  src={avatar.image}
                />
                <div className="profile_avatarTitles">
                  <Text weight="3">{avatar.name}</Text>
                </div>
              </div>
              
              <List>
                <Cell
                  size={12}
                  subtitle="Project"
                  after={avatar.project}
                />
                <Cell
                  size={12}
                  subtitle="Collection"
                  after={avatar.collection}
                />
                <Cell
                  size={12}
                  subtitle="Token ID"
                  after={avatar.token_id}
                />
              </List>
            </div>
          ))}
        </Section>
      </List>
    </Page>
  );
}
