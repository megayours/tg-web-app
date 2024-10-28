'use client';

import { Section, Cell, List, Avatar as TelegramAvatar, Text, Divider, Selectable, LargeTitle } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';
import { Avatar, useAllAvatars, useEquippedAvatar } from '@/hooks/useDappApi';
import './styles.css';
import { useState, useEffect } from 'react';

const avatarKey = (avatar: Avatar) => `${avatar.project}-${avatar.collection}-${avatar.token_id}`;

export default function Profile() {
  const { data: avatars, isLoading } = useAllAvatars();
  const { data: equippedAvatar } = useEquippedAvatar();
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);

  useEffect(() => {
    if (equippedAvatar && !selectedAvatarId) {
      const key = avatarKey(equippedAvatar);
      setSelectedAvatarId(key);
    }
  }, [equippedAvatar, selectedAvatarId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      <List>
        <Section header="Equipped Avatar">
          <form>
          {avatars?.map(avatar => (
            <Cell 
              key={avatarKey(avatar)}
              Component="label" 
              before={
                <Selectable
                  checked={selectedAvatarId === avatarKey(avatar)}
                  onChange={() => setSelectedAvatarId(avatarKey(avatar))}
                  name="avatar-selection" 
                  value={avatarKey(avatar)} 
                />
              }
              after={<TelegramAvatar size={40} src={avatar.image} />}
              description={`${avatar.project} - ${avatar.collection}`} 
              multiline
            >
              Token ID {avatar.token_id}
            </Cell>
          ))}
          </form>
        </Section>
      </List>
    </Page>
  );
}
