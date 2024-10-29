'use client';

import { List } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';
import { Avatar, BaseToken, useAllArmor, useAllAvatars, useAllWeapons, useEquippedAvatar } from '@/hooks/useDappApi';
import './styles.css';
import { useState, useEffect } from 'react';
import EquipmentSection from './EquipmentSection';

const tokenKey = (token: BaseToken) => `${token.project}-${token.collection}-${token.id}`;

const Profile = () => {
  const { data: avatars, isLoading } = useAllAvatars();
  const { data: equippedAvatar } = useEquippedAvatar();
  const { data: weapons } = useAllWeapons();
  const { data: heads } = useAllArmor('head');
  const { data: chests } = useAllArmor('chest');
  const { data: hands } = useAllArmor('hands');
  const { data: legs } = useAllArmor('legs');
  const { data: feets } = useAllArmor('feets');

  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [selectedWeaponId, setSelectedWeaponId] = useState<string | null>(null);
  const [selectedHeadId, setSelectedHeadId] = useState<string | null>(null);
  const [selectedChestId, setSelectedChestId] = useState<string | null>(null);
  const [selectedHandsId, setSelectedHandsId] = useState<string | null>(null);
  const [selectedLegsId, setSelectedLegsId] = useState<string | null>(null);
  const [selectedFeetsId, setSelectedFeetsId] = useState<string | null>(null);

  useEffect(() => {
    if (equippedAvatar && !selectedAvatarId) {
      const key = tokenKey(equippedAvatar);
      setSelectedAvatarId(key);
    }
  }, [equippedAvatar, selectedAvatarId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      <List>
        <EquipmentSection
          title="Avatar"
          items={avatars}
          selectedId={selectedAvatarId}
          onSelect={setSelectedAvatarId}
        />
        <EquipmentSection
          title="Weapons"
          items={weapons as BaseToken[]}
          selectedId={selectedWeaponId}
          onSelect={setSelectedWeaponId}
        />
        <EquipmentSection
          title="Head"  
          items={heads as BaseToken[]}
          selectedId={selectedHeadId}
          onSelect={setSelectedHeadId}
        />
        <EquipmentSection
          title="Chest"  
          items={chests as BaseToken[]}
          selectedId={selectedChestId}
          onSelect={setSelectedChestId}
        />
        <EquipmentSection
          title="Hands"  
          items={hands as BaseToken[]}
          selectedId={selectedHandsId}
          onSelect={setSelectedHandsId}
        />
        <EquipmentSection
          title="Legs"  
          items={legs as BaseToken[]}
          selectedId={selectedLegsId}
          onSelect={setSelectedLegsId}
        />
        <EquipmentSection
          title="Feets"  
          items={feets as BaseToken[]}
          selectedId={selectedFeetsId}
          onSelect={setSelectedFeetsId}
        />
      </List>
    </Page>
  );
}

export default Profile;