'use client';

import { Headline, Section, Spinner } from "@telegram-apps/telegram-ui";

export default function Loading({ message }: { message: string }) {
  return (
    <Section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '24px',
        background: 'var(--tg-theme-bg-color)',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <Spinner size="l" />
        <Headline>{message}</Headline>
      </div>
    </Section>
  );
}
