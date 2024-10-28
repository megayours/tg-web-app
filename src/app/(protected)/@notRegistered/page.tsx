"use client";

import { Section, Text, Button } from "@telegram-apps/telegram-ui";
import { useMintNFT } from "@/hooks/useMintNFT";
import { useAccountPolling } from "@/hooks/useAccountPolling";
import "./styles.css";
import { useTranslations } from 'next-intl';
import UserButtons from "@/libs/chromia-connect/user-buttons";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const NotRegistered = () => {
  const router = useRouter();
  const { mint, isMinting, isMinted, isReady, error } = useMintNFT();
  const { data: hasAccount } = useAccountPolling(isMinted);
  const t = useTranslations('pages.notRegistered');

  useEffect(() => {
    if (hasAccount) {
      router.push('/');
    }
  }, [hasAccount, router]);

  const getStatusMessage = () => {
    if (isMinted) {
      return (
        <Text Component="p" style={{ color: 'var(--tg-theme-link-color)' }}>
          NFT minting in progress!
        </Text>
      );
    }
    
    if (error) {
      return (
        <Text Component="p" style={{ color: 'var(--tg-theme-destructive-text-color)' }}>
          {error}
        </Text>
      );
    }

    if (!isReady) {
      return (
        <Text Component="p" style={{ color: 'var(--tg-theme-hint-color)' }}>
          Please connect your wallet first to mint an asset
        </Text>
      );
    }

    return null;
  };

  return (
    <Section className="notRegistered_container">
      <div className="notRegistered_main">
        <div className="notRegistered_card">
          <Text Component="header" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            {t('title')}
          </Text>

          <Text Component="p" style={{ marginBottom: '16px' }}>
            {t('description')}
          </Text>

          <div style={{ padding: '16px 0' }}>
            <Button 
              onClick={mint}
              disabled={!isReady || isMinting || isMinted}
              loading={isMinting}
            >
              {isMinting ? 'Minting...' : 'Mint NFT'}
            </Button>
          </div>

          <div style={{ marginTop: '8px' }}>
            {getStatusMessage()}
          </div>

          {isMinted && !hasAccount && (
            <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'var(--tg-theme-secondary-bg-color)', borderRadius: '8px' }}>
              <Text Component="p" style={{ marginBottom: '8px' }}>
                Please wait while we set up your account...
              </Text>
            </div>
          )}
          <UserButtons />
        </div>
      </div>
    </Section>
  );
};

export default NotRegistered;
