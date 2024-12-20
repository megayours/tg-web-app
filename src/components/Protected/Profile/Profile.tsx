'use client';

import { List, Button, Text, Headline } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';
import { BaseToken, useAllArmor, useAllAvatars, useAllWeapons, useEquipAvatar, useEquipEquipment, useEquippedAvatar, useEquippedEquipment } from '@/hooks/useDappApi';
import './styles.css';
import { useState, useEffect } from 'react';
import EquipmentSection from './EquipmentSection';
import { useMintNFT } from '@/hooks/useMintNFT';
import { CONTRACTS } from '@/config/contracts';
import { Address } from 'viem';
import { useAvatarAndEquipmentBackgroundRefresh } from '@/hooks/useBackgroundRefresh';
import { AttributesCard } from '@/components/AttributesCard/AttributesCard';

const tokenKey = (token: BaseToken) => `${token.project}-${token.collection}-${token.id}`;

const Profile = () => {
  const { data: equippedAvatar } = useEquippedAvatar();
  const { data: equippedEquipment } = useEquippedEquipment();

  const { data: avatars, isLoading: isLoadingAvatars } = useAllAvatars();
  const { data: weapons, isLoading: isLoadingWeapons } = useAllWeapons();
  const { data: heads, isLoading: isLoadingHeads } = useAllArmor('head');
  const { data: chests, isLoading: isLoadingChests } = useAllArmor('chest');
  const { data: hands, isLoading: isLoadingHands } = useAllArmor('hands');
  const { data: legs, isLoading: isLoadingLegs } = useAllArmor('legs');
  const { data: feets, isLoading: isLoadingFeets } = useAllArmor('feets');

  const { mutate: equipAvatar } = useEquipAvatar();
  const { mutate: equipEquipment } = useEquipEquipment();

  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [selectedWeaponId, setSelectedWeaponId] = useState<string | null>(null);
  const [selectedHeadId, setSelectedHeadId] = useState<string | null>(null);
  const [selectedChestId, setSelectedChestId] = useState<string | null>(null);
  const [selectedHandsId, setSelectedHandsId] = useState<string | null>(null);
  const [selectedLegsId, setSelectedLegsId] = useState<string | null>(null);
  const [selectedFeetsId, setSelectedFeetsId] = useState<string | null>(null);

  const { mint, isMinting, isMinted, isReady, error } = useMintNFT(CONTRACTS.EQUIPMENT.address as Address);

  const [showMintSuccess, setShowMintSuccess] = useState(false);

  useAvatarAndEquipmentBackgroundRefresh();

  // Show success message for 10 seconds after minting
  useEffect(() => {
    if (isMinted) {
      setShowMintSuccess(true);
      const timer = setTimeout(() => {
        setShowMintSuccess(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isMinted]);

  useEffect(() => {
    if (equippedAvatar && !selectedAvatarId) {
      const key = tokenKey(equippedAvatar);
      setSelectedAvatarId(key);
    }
  }, [equippedAvatar, selectedAvatarId]);

  useEffect(() => {
    if (equippedEquipment) {
      for (const equipment of equippedEquipment) {
        const key = tokenKey(equipment as BaseToken);
        console.log('Checking equipment', equipment);
        switch (equipment.slot) {
          case 'weapon': setSelectedWeaponId(key); break;
          case 'head': setSelectedHeadId(key); break;
          case 'chest': setSelectedChestId(key); break;
          case 'hands': setSelectedHandsId(key); break;
          case 'legs': setSelectedLegsId(key); break;
          case 'feets': setSelectedFeetsId(key); break;
        }
      }
    }
  }, [equippedEquipment, setSelectedWeaponId, setSelectedHeadId, setSelectedChestId, setSelectedHandsId, setSelectedLegsId, setSelectedFeetsId]);

  if (isLoadingAvatars || isLoadingWeapons || isLoadingHeads || isLoadingChests || isLoadingHands || isLoadingLegs || isLoadingFeets) {
    return <div>Loading...</div>;
  }

  const handleEquipAvatar = (avatarId: string) => {
    if (avatarId) {
      const [project, collection, tokenId] = avatarId.split('-');
      setSelectedAvatarId(avatarId);
      equipAvatar({ project, collection, tokenId: parseInt(tokenId) });
    }
  };

  const handleEquipEquipment = (equipmentId: string, slot: string) => {
    if (equipmentId && slot) {
      const [project, collection, tokenId] = equipmentId.split('-');

      switch (slot) {
        case 'weapon': setSelectedWeaponId(equipmentId); break;
        case 'head': setSelectedHeadId(equipmentId); break;
        case 'chest': setSelectedChestId(equipmentId); break;
        case 'hands': setSelectedHandsId(equipmentId); break;
        case 'legs': setSelectedLegsId(equipmentId); break;
        case 'feets': setSelectedFeetsId(equipmentId); break;
      }

      equipEquipment({ project, collection, tokenId: parseInt(tokenId) });
    }
  };

  return (
    <Page>
      <List>
        <EquipmentSection
          title="Avatar"
          items={avatars}
          selectedId={selectedAvatarId}
          onSelect={handleEquipAvatar}
          emptyMessage="No avatars available. Purchase an avatar to start your journey!"
        />
        
        <div className="profile_attributes">
          <AttributesCard />
        </div>
        
        <div className="profile_equipment">
          <Headline>Equipment</Headline>
          </div>

        <EquipmentSection
          title="Weapons"
          items={weapons as BaseToken[]}
          selectedId={selectedWeaponId}
          onSelect={(id) => handleEquipEquipment(id, 'weapon')}
          emptyMessage="No weapons available. Equip a weapon to increase your damage!"
        />
        <EquipmentSection
          title="Head"
          items={heads as BaseToken[]}
          selectedId={selectedHeadId}
          onSelect={(id) => handleEquipEquipment(id, 'head')}
          emptyMessage="No head armor available. Protect your head to increase defense!"
        />
        <EquipmentSection
          title="Chest"
          items={chests as BaseToken[]}
          selectedId={selectedChestId}
          onSelect={(id) => handleEquipEquipment(id, 'chest')}
          emptyMessage="No chest armor available. Protect your chest for better defense!"
        />
        <EquipmentSection
          title="Hands"
          items={hands as BaseToken[]}
          selectedId={selectedHandsId}
          onSelect={(id) => handleEquipEquipment(id, 'hands')}
          emptyMessage="No hand armor available. Protect your hands for improved defense!"
        />
        <EquipmentSection
          title="Legs"
          items={legs as BaseToken[]}
          selectedId={selectedLegsId}
          onSelect={(id) => handleEquipEquipment(id, 'legs')}
          emptyMessage="No leg armor available. Protect your legs to boost defense!"
        />
        <EquipmentSection
          title="Feets"
          items={feets as BaseToken[]}
          selectedId={selectedFeetsId}
          onSelect={(id) => handleEquipEquipment(id, 'feets')}
          emptyMessage="No feet armor available. Protect your feet for additional defense!"
        />
      </List>
      
      <div className="profile_purchaseButton">
        <Button 
          onClick={mint}
          disabled={!isReady || isMinting}
          loading={isMinting}
        >
          {isMinting ? 'Purchasing...' : 'Purchase Equipment'}
        </Button>
        
        {error && (
          <Text Component="p" style={{ color: 'var(--tg-theme-destructive-text-color)', marginTop: '8px' }}>
            {error}
          </Text>
        )}
        
        {showMintSuccess && (
          <>
            <br />
            <Text Component="p" style={{ color: 'var(--tg-theme-link-color)', marginTop: '8px' }}>
              Equipment purchased successfully! It will be available in a few minutes.
            </Text>
          </>
        )}
      </div>
    </Page>
  );
}

export default Profile;
