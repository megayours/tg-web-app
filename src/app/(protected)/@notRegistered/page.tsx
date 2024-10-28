"use client";

import { Section, Text, Button } from "@telegram-apps/telegram-ui";
import { useMintNFT } from "@/hooks/useMintNFT";
import "./styles.css";
import { useTranslations } from 'next-intl';

const NotRegistered = () => {
  const { mint, isMinting, isMinted, isReady, error } = useMintNFT();
  const t = useTranslations('pages.notRegistered');

  const getStatusMessage = () => {
    if (isMinted) {
      return (
        <Text Component="p" style={{ color: 'var(--tg-theme-link-color)' }}>
          NFT minted successfully! You can now authorize to access the app.
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
              disabled={!isReady || isMinting}
              loading={isMinting}
            >
              {isMinting ? 'Minting...' : 'Mint NFT'}
            </Button>
          </div>

          <div style={{ marginTop: '8px' }}>
            {getStatusMessage()}
          </div>

          {isMinted && (
            <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'var(--tg-theme-secondary-bg-color)', borderRadius: '8px' }}>
              <Text Component="p" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                Next Steps:
              </Text>
              <ol style={{ paddingLeft: '20px' }}>
                <li>
                  <Text Component="p">Click the &ldquo;Authorize&rdquo; button above to access the app</Text>
                </li>
                <li>
                  <Text Component="p">If you want to use a different wallet, click &ldquo;Disconnect&rdquo; first</Text>
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default NotRegistered;
